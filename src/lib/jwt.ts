import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = "1h";  // You can adjust the expiration time

// Create JWT token
export function createJWT(user: { _id: string, email: string, role: string, tenantDb: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

// Verify JWT token
export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
