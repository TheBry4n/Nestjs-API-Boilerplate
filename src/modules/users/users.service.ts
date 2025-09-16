import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './users-dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordService } from '../../utils/password.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
    ) {}

    async createUser(body: CreateUserDto) {
        try{
            const hashedPassword = await this.passwordService.hashPassword(body.password);
            body.password = hashedPassword;
            const user = await this.prisma.user.create({
                data: {
                    ...body,
                }
            })
            return user;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
