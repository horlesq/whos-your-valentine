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
        validate: [arrayLimit, "{PATH} exceeds the limit of 9"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 21600, // 6 hours in seconds (6 * 60 * 60)
    },
});

function arrayLimit(val) {
    return val.length === 9;
}

// Check if model exists before compiling to avoid OverwriteModelError in serverless environment
module.exports =
    mongoose.models.Valentine || mongoose.model("Valentine", valentineSchema);
