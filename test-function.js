const axios = require("axios");

async function test() {
    try {
        const response = await axios.post(
            "http://localhost:8888/.netlify/functions/create-valentine",
            {
                senderName: "Test Scripts",
                images: Array(9).fill(
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
                ),
            },
        );
        console.log("Success:", response.data);
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message,
        );
    }
}

test();
