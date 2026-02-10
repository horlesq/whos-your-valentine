# 💘 Valentine's Day Captcha

A cute, interactive, and customizable Valentine's Day asking app. Instead of a boring question, make your valentine prove they know you by selecting all the photos of you!

<video src="public/screen-rec.webm" controls></video>

## Features

- **Custom Verification**: Users upload 9 photos of themselves.
- **Shareable Links**: Generates a unique link to send to a valentine.
- **Interactive "Captcha"**: The valentine must select all images of the creator to "Start".
- **Success Celebration**: A cute screen upon success.
- **Privacy Focused**: data is automatically deleted after 6 hours.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Backend**: Netlify Functions (Serverless Node.js)
- **Database**: MongoDB (Atlas)

## Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB Atlas account

### Installation

1.  **Clone the repo**

    ```bash
    git clone https://github.com/yourusername/valentine-captcha.git
    cd valentine-captcha
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    # or to run with Netlify Functions locally:
    npx netlify dev
    ```

## Deployment

This project is configured for **Netlify**.

1. Push your code to GitHub.
2. Import the project into Netlify.
3. Add your `MONGODB_URI` to Netlify's **Environment Variables**.
4. Deploy!

## Privacy & Data

To ensure user privacy and avoid database clutter:

- **TTL Index**: MongoDB is configured to automatically delete all records (photos and names) **6 hours** after creation.
- No personal data is permanently stored.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, feel free to reach out via:

- GitHub: [Horlesq](https://github.com/horlesq)
- Linkedin: [Adrian Horlescu](https://www.linkedin.com/in/adrian-horlescu/)
- Website: [horly.dev](https://horly.dev)

---

For questions or suggestions, feel free to open an issue or submit a pull request.
