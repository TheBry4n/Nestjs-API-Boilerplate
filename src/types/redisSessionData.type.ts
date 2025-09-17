
export type RedisSessionData = {
    userId: string;
    createdAt: Date;
    tokens: {
        access_jti: string;
        refresh_jti: string;
    }
}