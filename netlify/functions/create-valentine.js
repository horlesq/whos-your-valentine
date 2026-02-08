const mongoose = require("mongoose");
const connectToDatabase = require("./utils/db");
const Valentine = require("./models/Valentine.js");

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        await connectToDatabase();

        const valentine = new Valentine({
            senderName: data.senderName,
            images: data.images,
        });

        await valentine.save();

        return {
            statusCode: 200,
            body: JSON.stringify(valentine),
        };
    } catch (err) {
        if (err.name === "ValidationError") {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: err.message }),
            };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
