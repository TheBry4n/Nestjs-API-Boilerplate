import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto } from './auth-dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from 'src/utils/jwt.service';
import { PasswordService } from 'src/utils/password.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService
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
            return {
                message: 'Login successful',
                tokens: tokens,
            }
        } catch (error) {
            throw new InternalServerErrorException('Internal server error during login');
        }
    }
}
