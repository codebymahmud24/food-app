const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        });

        console.log('✅ MongoDB Connected successfully!');
        console.log('Host:', conn.connection.host);
        console.log('Database Name:', conn.connection.name);
        console.log('Ready State:', conn.connection.readyState);
        
        await mongoose.connection.close();
        console.log('✅ Connection closed successfully');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        if (error.cause) {
            console.error('Error cause:', error.cause);
        }
        
        process.exit(1);
    }
}

testConnection();