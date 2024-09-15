import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get("token").value || "hi";
  console.log("my tok" + token);
  // Determine if the requested path is public
  const PublicPaths = ["/login", "/signup"];

  // Redirect logic based on authentication status and path
  if (token && PublicPaths) {
    // Redirect authenticated users from public paths to the home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !PublicPaths) {
    // Redirect unauthenticated users from protected paths to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

// Define which paths the middleware should apply to
export const config = {
  matcher: ["/login", "/signup", "/profile", "/protected/:path*"], // Adjust paths as needed
};
