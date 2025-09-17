import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateUserResponseDto {
    @ApiProperty({
        description: 'The message of the response',
        example: 'User created successfully',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({
        description: 'The user information',
        required: true,
        type: Object,
    })
    @IsObject()
    @IsNotEmpty()
    user_info: {
        id: string;
        email: string;
        username: string;
        name: string;
        surname: string;
    }
}