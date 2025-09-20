import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../../../utils/jwt.service';
import { RedisService } from '../../../utils/redis.service';

@Injectable()
export class JwtGuard {
    constructor(
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this._extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("Token not provided");
        }

        try{
            const payload = await this.jwtService.verifyTokenType(token, 'access');

            if (!payload) {
                throw new UnauthorizedException("Token is invalid");
            }

            const isBlacklisted = await this.redisService.isTokenBlacklisted(payload.sub);

            if (isBlacklisted) {
                throw new UnauthorizedException("Token blacklisted");
            }

            const session = await this.redisService.getSession(payload.sub);
            if (!session) {
                throw new UnauthorizedException("Session not found");
            }

            request.user = {
                id: payload.sub,
                jti: payload.jti,
                sessionId: session.userId,
            }

            return true;
        }catch(error){
            throw new UnauthorizedException("Token is invalid");
        }
    }

    private _extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}