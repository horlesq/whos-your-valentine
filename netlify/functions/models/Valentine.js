const mongoose = require("mongoose");

const valentineSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String], // Array of Base64 strings
        required: true,
        validate: [arrayLimit, "{PATH} must exceed 9 images"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "30d", // Auto-delete after 30 days
    },
});

function arrayLimit(val) {
    return val.length === 9;
}

// Check if model exists before compiling to avoid OverwriteModelError in serverless environment
module.exports =
    mongoose.models.Valentine || mongoose.model("Valentine", valentineSchema);
