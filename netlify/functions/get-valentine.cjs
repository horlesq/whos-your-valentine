const mongoose = require("mongoose");
const connectToDatabase = require("./utils/db.cjs");
const Valentine = require("./models/Valentine.cjs");

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== "GET") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { id } = event.queryStringParameters;

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "ID is required" }),
        };
    }

    try {
        await connectToDatabase();
        const valentine = await Valentine.findById(id);

        if (!valentine) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Valentine not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(valentine),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
