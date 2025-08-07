import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include user ID
declare global {
    namespace Express{
        interface Request {
            id: string;
        }
    }
}


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from HTTP-only cookie
        const token = req.cookies.token;
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
        
        // Verify the token using JWT secret from environment variables
        // Note: Using JWT_SECRET to match the .env file configuration
        const jwtSecret = process.env.JWT_SECRET ;
        
        if (!jwtSecret) {
            console.error("JWT secret not found in environment variables");
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            });
        }
        
        const decode = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
        
        // Check if decoding was successful and contains userId
        if (!decode || !decode.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        // Attach user ID to request object for use in protected routes
        req.id = decode.userId;
        
        // Continue to next middleware/route handler
        next();
    } catch (error) {
        // Handle JWT verification errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }
        
        console.error("Authentication middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}