import mongoose from 'mongoose';

/**
 * Establishes connection to MongoDB database
 * Uses connection string from environment variables
 * Implements retry logic and proper error handling
 */
const connectDB = async (): Promise<void> => {
    try {
        // Check if MongoDB URI is provided
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }

        // Connect to MongoDB with recommended options
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Recommended options for production
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database Name: ${conn.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (error) => {
            console.error('❌ MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        
        // Exit process with failure if in production
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
        
        // In development, retry after 5 seconds
        console.log('🔄 Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

/**
 * Gracefully closes the database connection
 * Should be called when the application is shutting down
 */
export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed gracefully');
    } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
    }
};

export default connectDB;