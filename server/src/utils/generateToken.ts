import jwt, { SignOptions } from "jsonwebtoken";
import { IUserDocument } from "../models/User";
import { Response } from "express";

/**
 * Generates JWT token and sets it as HTTP-only cookie
 * @param res - Express Response object
 * @param user - User document from database
 * @returns Generated JWT token string
 */
export const generateToken = (res: Response, user: IUserDocument): string => {
    // Get JWT secret from environment variables (supporting both naming conventions)
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
    
    if (!jwtSecret) {
        throw new Error('JWT secret not found in environment variables');
    }
    
    // Create JWT payload with user ID
    const payload = {
        userId: user._id,
        email: user.email // Adding email for additional context
    };
    
    // JWT sign options - cast to any to avoid type issues
    const signOptions: any = {
        expiresIn: jwtExpiresIn
    };
    
    // Generate JWT token with expiration
    const token = jwt.sign(payload, jwtSecret, signOptions);
    
    // Calculate cookie max age based on JWT expiration
    const maxAge = jwtExpiresIn === '7d' ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    
    // Set HTTP-only cookie with security options
    res.cookie("token", token, {
        httpOnly: true, // Prevents XSS attacks
        sameSite: 'strict', // CSRF protection
        maxAge: maxAge, // Cookie expiration
        secure: process.env.NODE_ENV === 'production' // HTTPS only in production
    });
    
    return token;
}