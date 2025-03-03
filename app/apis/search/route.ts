import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import { Fact } from "@/models/fact.model";
import { Category } from "@/models/category.model";


export async function GET(request: Request) {
    try 
    {
        await connectDB(); 

        //fetch search text from query params 
        const { searchParams } = new URL(request.url);
        const searchText = searchParams.get("search");
        if (!searchText || typeof searchText !== "string") {
            return  NextResponse.json({ success: false, message: "Invalid query parameter", status: 400 })
        }

        const regex = new RegExp(`\\b${searchText}`, "i");

        const searchData = await Fact.find({ 
            title: { $regex: regex }  
        })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("title")
                
        return NextResponse.json({ success: true, data: searchData, status: 200 });
    }
    catch(err) {
        console.error("❌ Error creating fact:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}