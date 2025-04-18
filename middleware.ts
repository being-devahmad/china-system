import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function middleware(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return an error response
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  // Verify the JWT token
  const user = verifyJWT(token);
  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  // Attach user data to the request (optional)
  // This step is optional but can be helpful for further processing if needed
  (req as any).user = user;

  // Continue to the next middleware or route handler
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/protected"],  // Only protect specific routes
};
