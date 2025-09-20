export interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        jti: string;
        sessionId: string;
    };
}