import connectDB from "@/libs/connectMongoDB";
import UserData from "@/models/user.model";
import idbycookies from "@/utils/idbycookies";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
export async function POST(req) {
  try {
    await connectDB();

    const userID = await idbycookies(req);
    if (!userID) {
      throw new Error("Unauthorized");
    }
    // Parse the request body (use req.json() in the Next.js App Router)
    const user = await UserData.findOne({ _id: userID }).select("-password");
    return NextResponse.json({
      message: "User found ",
      data: user,
    });
  } catch (err) {}
}
