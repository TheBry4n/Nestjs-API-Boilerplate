import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({
        description: 'The message of the response',
        example: 'Login successful',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({
        description: 'Tokens',
        required: true,
        type: Object,
    })
    @IsObject()
    @IsNotEmpty()
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}