import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto, LogoutResponseDto } from './auth-dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from 'src/utils/jwt.service';
import { PasswordService } from 'src/utils/password.service';
import { RedisService } from 'src/utils/redis.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
        private readonly redisService: RedisService,
    ) {}
    
    async login(body: LoginRequestDto): Promise<LoginResponseDto> {
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    email: body.email,
                }
            })
            if(!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await this.passwordService.verifyPassword(body.password, user.password);
            if(!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }
            
            const tokens = await this.jwtService.generateTokens(user.id);

            const session = await this.redisService.getSession(user.id);
            if(session) {
                await this.redisService.deleteSession(user.id);
            }

            const access_jti = (await this.jwtService.getTokenPayload(tokens.accessToken)).jti;
            const refresh_jti = (await this.jwtService.getTokenPayload(tokens.refreshToken)).jti;
            await this.redisService.createSession(user.id, access_jti, refresh_jti);

            return {
                message: 'Login successful',
                tokens: tokens,
            }
        } catch (error) {
            throw new InternalServerErrorException('Internal server error during login');
        }
    }

    async logout(user_id: string): Promise<LogoutResponseDto> {
        try{
            await this.redisService.deleteSession(user_id);
            return {
                message: 'Logout successful',
            }
        } catch (error) {
            throw new InternalServerErrorException('Internal server error during logout');
        }
    }
}
