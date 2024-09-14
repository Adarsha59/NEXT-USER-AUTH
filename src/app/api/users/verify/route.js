import connectDB from "@/libs/connectMongoDB";
import UserData from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Extract the token from the query parameters
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Verification token is missing",
      });
    }

    // Find user with matching token and ensure it's not expired
    const user = await UserData.findOne({
      verifyToken: token,
      verifyTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Update user status to verified
    await UserData.findByIdAndUpdate(user._id, {
      isVarified: true,
      verifyToken: null,
      verifyTokenExpiration: null,
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to verify email",
      error: error.message || "Internal server error",
    });
  }
}
