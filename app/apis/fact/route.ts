import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { Fact } from "@/models/fact.model";
import { Category } from "@/models/category.model";
import uploadImageToS3 from "@/utils/aws.upload";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export async function POST(request: Request) {
    try {
            await connectDB(); 
            const formData = await request.formData();
            // Extract fields from FormData
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const userId = formData.get("userId") as string;
            const categoriesRaw = formData.get("categories") as string;
            const image = formData.get("image") as File // Optional image
            const link = formData.get("link") as string || null; // Optional link
            // Convert categories from JSON string to an array
            const categories = JSON.parse(categoriesRaw || "[]");


            const buffer = Buffer.from(await image.arrayBuffer());
            const fileUrl = await uploadImageToS3(buffer, image.type, image.name);
            
            // Validation: Ensure required fields are present
            if (!title || !description || !categories.length || !userId) {
                return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
            }

            // change the coun of categories present in the categoriesList
            for (let categoryId of categories) {
                await Category.findByIdAndUpdate(categoryId, { $inc: { count: 1 } });
            }
            

            // Create new fact in MongoDB
            const newFact = await Fact.create({
                title,
                description,
                categories,
                userId,
                image: fileUrl,
                link,
            });

            return NextResponse.json({ success: true, fact: newFact, status: 200 }, { status: 200 });
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

        //fetch searchParams from url
        const limitParam = searchParams.get("limit");
        const indexParam = searchParams.get("index");
        const randomParam = searchParams.get("random");

        const limit = limitParam ? parseInt(limitParam as string) : null;
        const index = indexParam ? parseInt(indexParam as string) : 0;
        const random = randomParam == "true" ? true : false;

        // Sort by latest created
        let facts = await Fact.find().sort({ createdAt: -1 }); 

        if(limit) {
            facts = facts.slice(index, limit);
        }

        if(random) {
            for (let i = facts.length - 1; i > 0; i--) {
                // Generate a random index from 0 to i
                const j = Math.floor(Math.random() * (i + 1));
            
                // Swap elements at i and j
                [facts[i], facts[j]] = [facts[j], facts[i]];
            }
        }
        return NextResponse.json({ success: true, data: facts, status: 200 });
    }
    catch(err) {
        console.error("❌ Error creating fact:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}