import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import connectDB from "../../../../libs/connectMongoDB";
import User from "../../../../models/user.model";
export async function POST(request) {
  try {
    // Connect to the MongoDB database
    await connectDB();

    // Parse JSON request body
    const { username, email, password } = await request.json();

    // Validate username, email, and password
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    console.log({ username, email, password });

    const hashedPassword = await hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username, // Include username in user creation
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
