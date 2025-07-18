import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, shorturl } = body;

    if (!url || !shorturl) {
      return NextResponse.json(
        { success: false, message: "URL and shorturl are required." },
        { status: 400 }
      );
    }
    const aliasRegex = /^[a-zA-Z0-9_-]+$/;
    if (!aliasRegex.test(shorturl)) {
        return NextResponse.json(
            { success: false, message: "Short URL can only contain letters, numbers, underscores, and hyphens." },
            { status: 400 }
        );
    }
    
    try {
        new URL(url);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid URL format provided." },
            { status: 400 }
        );
    }


    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url"); 

    const existingDoc = await collection.findOne({ shorturl: shorturl });
    if (existingDoc) {
      return NextResponse.json(
        { success: false, message: "This short URL alias is already taken." },
        { status: 409 }
      );
    }

    await collection.insertOne({
      url: url,
      shorturl: shorturl,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "URL generated successfully",
    });

  } catch (error) {
    console.error("API Error:", error); 
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
