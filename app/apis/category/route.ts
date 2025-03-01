import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { Category } from "@/models/category.model";
import uploadImageToS3 from "@/utils/aws.upload";

export async function POST(request: Request) {
    try {
             await connectDB(); 
            const formData = await request.formData();

            // Extract fields from FormData
            const title = formData.get("title") as string;
            const image = formData.get("image") as File;
            
            //upload file to s3 bucket
            const buffer = Buffer.from(await image.arrayBuffer());
            const fileUrl = await uploadImageToS3(buffer, image.type, image.name);

            // Validation: Ensure required fields are present
            if (!title || !fileUrl) {
                return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
            }

            // Create new fact in MongoDB
            const newFact = await Category.create({
                title,
                image: fileUrl,
            });

            return NextResponse.json({ success: true, fact: newFact }, { status: 201 });
    }
    catch(err) {
        console.error("❌ Error creating fact:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try 
    {
        await connectDB(); 
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string, 10) : undefined;

        const categories = await Category.find().limit(limit || 0);

        return NextResponse.json({ success: true, data: categories, status: 200 });
    }
    catch(err) {
        console.error("❌ Error creating fact:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
