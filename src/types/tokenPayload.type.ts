export type TokenPayload = {
    sub: string;
    type: 'access' | 'refresh';
}