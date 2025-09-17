import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from "@nestjs/common";
import Redis from "ioredis";
import { RedisSessionData } from "../types";
import { RedisConfig } from "../config/redis.config";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redisClient!: Redis;

    async onModuleInit() {
        this.redisClient = new Redis({
            host: RedisConfig.host,
            port: RedisConfig.port,
            password: RedisConfig.password,
            db: RedisConfig.db,
        });

        this.redisClient.on('connect', () => {
            console.log('Redis connected');
        })

        this.redisClient.on('error', (error) => {
            console.error('Redis error:', error);
        })
    }

    async onModuleDestroy() {
        if (this.redisClient) {
            await this.redisClient.quit();
        }
    }

    async createSession(user_id: string, access_jti: string, refresh_jti: string): Promise<void> {
        const sessonData: RedisSessionData = {
            userId: user_id,
            createdAt: new Date(),
            tokens: {
                access_jti,
                refresh_jti,
            }
        }

        try{
            await this.redisClient.setex(`session:${user_id}`, this._parseExpiryTime(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN), JSON.stringify(sessonData));
        } catch (error) {
            console.error('Error creating session:', error);
            throw new InternalServerErrorException('Failed to create session');
        }
    }

    async getSession(user_id: string): Promise<RedisSessionData | null> {
        try{
            const sessionData = await this.redisClient.get(`session:${user_id}`);
            return sessionData ? JSON.parse(sessionData) : null;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }

    async deleteSession(user_id: string): Promise<void> {
        try{
            const session = await this.getSession(user_id);
            if (session) {
                await this.blacklistToken(session.tokens.access_jti);
                await this.blacklistToken(session.tokens.refresh_jti);
            }
            await this.redisClient.del(user_id);
        } catch (error) {
            console.error('Error deleting session:', error);
            throw new InternalServerErrorException('Failed to delete session');
        }
    }

    async updateSession(user_id: string, access_jti: string, refresh_jti: string): Promise<void> {
        try{
            const sessionData = await this.redisClient.get(user_id);
            if (sessionData) {
                const parsedData = JSON.parse(sessionData);
                parsedData.tokens = { access_jti, refresh_jti };
                await this.redisClient.setex(user_id, this._parseExpiryTime(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN), JSON.stringify(parsedData));
            }
        } catch (error) {
            console.error('Error updating session:', error);
            throw new InternalServerErrorException('Failed to update session');
        }
    }

    async blacklistToken(token_jti: string): Promise<void> {
        try{
            await this.redisClient.setex(token_jti, this._parseExpiryTime(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN), 'blacklisted');
        } catch (error) {
            console.error('Error blacklisting token:', error);
            throw new InternalServerErrorException('Failed to blacklist token');
        }
    }

    async isTokenBlacklisted(token_jti: string): Promise<boolean> {
        try{
            const result = await this.redisClient.get(token_jti);
            return result === 'blacklisted';
        } catch (error) {
            console.error('Error checking if token is blacklisted:', error);
            return false;
        }
    }

    /* PRIVATE METHODS */
    private _parseExpiryTime(expiryTime: string): number {
        const unit = expiryTime.slice(-1);
        const value = parseInt(expiryTime.slice(0, -1));
        
        let seconds = 0;
        switch (unit) {
            case 's': seconds = value; break;
            case 'm': seconds = value * 60; break;
            case 'h': seconds = value * 60 * 60; break;
            case 'd': seconds = value * 60 * 60 * 24; break;
            default: seconds = value; break;
        }
        
        return seconds;
    }
}