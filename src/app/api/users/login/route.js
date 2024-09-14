import connectDB from "@/libs/connectMongoDB";
import UserData from "@/models/user.model";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await UserData.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // Generate a JSON Web Token (JWT) with the user ID
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Signed in successfully",
        status: 200,
        token,
      },
    });
    // Set a cookie with the JWT token
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    // Parse the request query parameters (use req.query in the Next.js App Router)
    console.error("Error signing in: ", error);
    return NextResponse.json({ message: "Failed to sign in" });
  }
}
