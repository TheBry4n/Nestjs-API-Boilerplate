import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserRequestDto, CreateUserResponseDto } from './users-dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordService } from '../../utils/password.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
    ) {}

    async createUser(body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        try{
            const hashedPassword = await this.passwordService.hashPassword(body.password);
            body.password = hashedPassword;
            const user = await this.prisma.user.create({
                data: {
                    ...body,
                }
            })
            return {
                message: 'User created successfully',
                user_info: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    surname: user.surname,
                },
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
