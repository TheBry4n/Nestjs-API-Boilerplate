import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("/create-user")
    async createUser(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body);
    }
}
