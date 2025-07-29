import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const user = await prisma.listner.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 403 });
  }

  return NextResponse.json({
    userId: user.id,
  });
}
