import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export interface AuthUser {
    userId: string;
    role: 'admin' | 'employee';
}

export interface AuthContext {
    user?: AuthUser;
}

export const getUser = (token: string): AuthUser | null => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
        return { userId: decoded.userId, role: decoded.role };
    } catch (err) {
        return null;
    }
};

export const requireAuth = (user?: AuthUser) => {
    if (!user) {
        throw new AuthenticationError('You must be logged in to access this resource');
    }
};

export const requireAdmin = (user?: AuthUser) => {
    requireAuth(user);
    if (user?.role !== 'admin') {
        throw new AuthenticationError('Not authorized. Admin access required.');
    }
};
