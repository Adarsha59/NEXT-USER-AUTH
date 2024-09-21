import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import connectDB from "../../../../libs/connectMongoDB";
import User from "../../../../models/user.model";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Connect to the MongoDB database
        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });

        // If user is not found, return null
        if (!user) {
          return null;
        }

        // Check if the password is correct
        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user._id, // Use _id for MongoDB
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
