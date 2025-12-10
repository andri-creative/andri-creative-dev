import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-very-long"
);

export async function POST(req: Request) {
  const body = await req.json();
  console.log("🚀 ~ POST ~ body:", body);

  const { email, secretCode } = body;

  if (
    email !== process.env.EmailAdmin ||
    secretCode !== process.env.SecretCodeAdmin
  ) {
    return NextResponse.json(
      { message: "Email atau kode rahasia salah" },
      { status: 401 }
    );
  }

  const token = await new SignJWT({
    email,
    role: process.env.RoleAdmin || "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(JWT_SECRET);

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return res;
}
