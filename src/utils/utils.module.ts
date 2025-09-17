import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwt.config';

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: JwtConfig.secret,
            signOptions: {
                expiresIn: JwtConfig.expiresIn,
            },
        }),
    ],
    providers: [PasswordService, JwtService],
    exports: [PasswordService, JwtService],
})
export class UtilsModule {}