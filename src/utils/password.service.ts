import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {

    private _mergePepper(password: string): string {
        return password + process.env.PEPPER;
    }

    async hashPassword(password: string): Promise<string> {
        return await argon2.hash(this._mergePepper(password));
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, this._mergePepper(password));
    }
}