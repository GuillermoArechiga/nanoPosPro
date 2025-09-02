import 'dotenv/config';

export const AMPLIFY_API_URL = process.env.AMPLIFY_API_URL;
export const API_HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": process.env.API_KEY,
};

// Validate
if (!AMPLIFY_API_URL || !process.env.API_KEY) {
  throw new Error("AMPLIFY_API_URL or API_KEY not set in environment variables!");
}