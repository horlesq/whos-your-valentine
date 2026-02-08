exports.handler = async (event, context) => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        return { statusCode: 500, body: "MONGODB_URI is MISSING" };
    }

    // Mask the password for security
    const masked = uri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");

    return {
        statusCode: 200,
        body: `MONGODB_URI is set! URL: ${masked}`,
    };
};
