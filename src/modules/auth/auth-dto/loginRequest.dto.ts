import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@test.com',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}