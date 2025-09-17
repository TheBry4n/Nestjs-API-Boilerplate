import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto, CreateUserResponseDto } from './users-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("/create-user")
    async createUser(@Body() body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        return this.usersService.createUser(body);
    }
}
