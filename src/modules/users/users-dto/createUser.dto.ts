import { IsString, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@test.com',
        required: true,
        type: String,
        format: 'email',
        maxLength: 255,
        minLength: 3,
        uniqueItems: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @MinLength(3)
    email: string;

    @ApiProperty({
        description: 'The username of the user',
        example: 'test',
        required: true,
        type: String,
        maxLength: 255,
        minLength: 3,
        uniqueItems: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
        required: true,
        type: String,
        maxLength: 255,
        minLength: 8,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'Mario',
        required: true,
        type: String,
        maxLength: 255,
        minLength: 3,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'The surname of the user',
        example: 'Rossi',
        required: true,
        type: String,
        maxLength: 255,
        minLength: 3,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    surname: string;
}