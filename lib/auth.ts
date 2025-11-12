// lib/auth.ts
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string || "jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) throw new Error("Please define JWT_SECRET in env");

export function signToken(payload: Record<string, any>) {
  // cast secret and options to the expected jsonwebtoken types to satisfy TS overloads
  return jwt.sign(payload, JWT_SECRET as Secret, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (err) {
    return null;
  }
}

export function getTokenFromReq(req: Request | NextRequest) {
  // NextRequest headers: req.headers.get(...)
  const headers = (req as any).headers;
  if (headers && typeof headers.get === "function") {
    const auth = headers.get("authorization");
    if (!auth) return null;
    const parts = auth.split(" ");
    if (parts[0] !== "Bearer") return null;
    return parts[1];
  } else {
    const auth = (req as any).headers?.authorization || (req as any).headers?.Authorization;
    if (!auth) return null;
    const parts = auth.split(" ");
    if (parts[0] !== "Bearer") return null;
    return parts[1];
  }
}
