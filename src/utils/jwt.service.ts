import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';
import { Tokens, TokenPayload } from '../types';
import { randomUUID } from 'crypto';

@Injectable()
export class JwtService {
    constructor(private readonly jwt: NestJwtService) {}

    async generateTokens(userId: string): Promise<Tokens> {
        const access_payload: TokenPayload = {
            jti: randomUUID().toString(),
            sub: userId,
            type: 'access',
        }
        const refresh_payload: TokenPayload = {
            jti: randomUUID().toString(),
            sub: userId,
            type: 'refresh',
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwt.signAsync(access_payload, {
                secret: JwtConfig.secret,
                expiresIn: JwtConfig.expiresIn,
            }),
            this.jwt.signAsync(refresh_payload, {
                secret: JwtConfig.secret,
                expiresIn: JwtConfig.refreshTokenExpiresIn,
            }),
        ])

        return {
            accessToken,
            refreshToken,
        }
    }

    async verifyTokenType(token: string, type: 'access' | 'refresh'): Promise<TokenPayload> {
        try{
            const payload = await this.jwt.verifyAsync(token, {
                secret: JwtConfig.secret,
            })
            if(payload.type !== type) {
                throw new UnauthorizedException('Invalid token type');
            }
            return payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async getTokenPayload(token: string): Promise<TokenPayload> {
        try{
            const payload = await this.jwt.verifyAsync(token, {
                secret: JwtConfig.secret,
            })
            return payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}