import connectDB from "@/libs/connectMongoDB";
import UserData from "@/models/user.model";
import { NextResponse } from "next/server";
import mailHelper from "@/utils/mailHelper";
const bcrypt = require("bcrypt");
export async function POST(req) {
  try {
    await connectDB();
    // Parse the request body (use req.json() in the Next.js App Router)
    const { token } = req.json();
    console.log("token: " + token);
    // Verify the token and get the user ID
    const user = await UserData.findOne({
      verifyToken: token,
      verifyTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("Invalid or expired verification token");
    }
    // Mark the user as verified and remove the verification token
    await UserData.findByIdAndUpdate(user._id, {
      isVarified: true,
      verifyToken: null,
      verifyTokenExpiration: null,
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email: ", error);
    return NextResponse.json({ message: "Failed to verify email" });
  }
}
