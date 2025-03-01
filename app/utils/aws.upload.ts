import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function uploadImageToS3(fileBuffer: Buffer, contentType: string, fileName: string) {
  const key = `uploads/${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read",
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
