import connectDB from "@/libs/connectMongoDB";
import UserData from "@/models/user.model";
import { NextResponse } from "next/server";
import mailHelper from "@/utils/mailHelper";
const bcrypt = require("bcrypt");
export async function POST(req) {
  try {
    await connectDB();
    // Parse the request body (use req.json() in the Next.js App Router)
    const { username, email, password } = await req.json();

    const user = await UserData.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with the provided username, email, and hashed password
    const Register = {
      username,
      email,
      password: hashedPassword,
    };
    const newUser = new UserData(Register);
    await newUser.save();
    console.log("User", newUser);

    // Send a verification email to the user
    await mailHelper({
      email,
      emailType: "VERIFY",
      userId: newUser._id,
    });

    const success = true;

    // Return a JSON response with the success status, message, and the newly created user object
    return NextResponse.json({
      success,
      message: "User registered successfully",
      status: success,
      newUser,
    });
  } catch (error) {
    console.log("object", error);
    return NextResponse({
      message: "User cancelled",
      status: 500,
    });
  }
}
