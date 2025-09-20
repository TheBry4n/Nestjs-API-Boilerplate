import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto, LogoutResponseDto } from './auth-dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards';
import { AuthenticatedRequest } from '../../interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authService.login(body);
    }

    @Post('/logout')
    @UseGuards(JwtGuard)
    async logout(@Req() request: AuthenticatedRequest): Promise<LogoutResponseDto> {
        const user_id = request.user?.id;
        return this.authService.logout(user_id);
    }
    
}
