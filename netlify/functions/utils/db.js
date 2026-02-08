const mongoose = require("mongoose");

let isConnected = false;

module.exports = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is missing");
        throw new Error("MONGODB_URI is missing from environment variables");
    }

    try {
        console.log("Connecting to MongoDB...");
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to database");
    }
};
