import connectDB from "@/libs/connectMongoDB";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await connectDB();
    const response = NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Logout  successfully",
        status: 200,
      },
    });
    // Set a cookie with the JWT token
    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    // Parse the request query parameters (use req.query in the Next.js App Router)
    console.error("Error in logout: ", error);
    return NextResponse.json({ message: "Failed to Logout" });
  }
}
