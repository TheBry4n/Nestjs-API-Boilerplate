export type TokenPayload = {
    jti: string;
    sub: string;
    type: 'access' | 'refresh';
}