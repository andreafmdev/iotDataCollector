// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import httpStatusCodes from '@utils/httpStatusCodes';
import jwt from 'jsonwebtoken';
import type { UserToken } from '@customTypes/UserToken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
             res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid token!' });
             return;
        }
        const token = authHeader.split(' ')[1];
        const decodedJwt:UserToken = jwt.verify(token, process.env.JWT_SECRET!) as UserToken;
        const { userId } = decodedJwt;
        res.locals.token = {userId};
        next();

    } catch (error) {
        console.error('JWT verification error:', error);

        res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid token!' });

    }
}
