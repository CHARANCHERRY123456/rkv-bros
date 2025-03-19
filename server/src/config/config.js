import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASS = process.env.EMAIL_PASS;
