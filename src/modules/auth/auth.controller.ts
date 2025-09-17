import { Controller, Post, Body } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto } from './auth-dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authService.login(body);
    }
}
