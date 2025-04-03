

// aws.config.ts
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { AWS_REGION, CloudflareR2ApiURL } from "../serviceUrl";
dotenv.config();

const s3 = new S3Client({
  region: AWS_REGION,
  endpoint: CloudflareR2ApiURL, // Cloudflare R2 endpoint
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default s3;
