//This is where we will have all our base Urls
import dotenv from "dotenv";
dotenv.config();
export const Termii_BASE_URL = process.env.TERMII_BASE_URL;
export const PORT = process.env.PORT;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const AWS_REGION = process.env.AWS_REGION;
export const CloudflareR2ApiURL = process.env.CloudflareR2ApiURL;
export const DB_URI = process.env.DB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const RefreshToken_Secret_Key = process.env.RefreshToken_Secret_Key;
export const AccessToken_Secret_Key = process.env.AccessToken_Secret_Key;
export const TERMII_API_KEY = process.env.TERMII_API_KEY
export const TERMII_SENDER_ID = process.env.TERMII_SENDER_ID
export const CLOUDFLARE_BUCKETNAME = process.env.CLOUDFLARE_BUCKETNAME;
export const GOOGLE_ADDRESS = process.env.GOOGLE_ADDRESS;
export const GOOGLE_PASS = process.env.GOOGLE_PASS;
export const BREVO_SMTP = process.env.BREVO_SMTP;
export const BREVO_PORT = process.env.BREVO_PORT;
export const BREVO_RELAY = process.env.BREVO_RELAY;
export const Tracking_Token_Secret_Key = process.env.Tracking_Token_Secret_Key;
export const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
export const YOUVERIFY_API_KEY = process.env.YOUVERIFY_API_KEY;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const VAPID_KEY = process.env.VAPID_KEY;
export const API_URL = process.env.API_URL;