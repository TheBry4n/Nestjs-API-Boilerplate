import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
    @ApiProperty({
        description: 'Message',
        example: 'User logged out successfully',
    })
    @IsString()
    @IsNotEmpty()
    message: string;
}