import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { Fact } from "@/models/fact.model";
import { Category } from "@/models/category.model";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export async function POST(request: Request) {
    try {
            await connectDB(); 
            const body = await new Response(request.body).json(); // Parse the request body manually
            // Create new fact in MongoDB
            let factsList = await Fact.insertMany([...body]);

            const categoryCounts: Record<string, number> = {};



            factsList.forEach(fact => {
                if (fact.categories.length > 0) {
                    fact.categories.forEach((category:string) => {
                        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                    })
                }
            });

            console.log(categoryCounts);
    
            // Update fact count in Category model
            const categoryUpdates = Object.entries(categoryCounts).map(([categoryId, count]) =>
                Category.updateOne({ _id: categoryId }, { $inc: { count: count } })
            );
    
            await Promise.all(categoryUpdates);
    
            return NextResponse.json({ success: true, facts: factsList, status: 200 }, { status: 200 });
    }
    catch(err) {
        console.error("❌ Error creating fact:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}