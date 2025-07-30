// File: /api/streams/current/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const user = await prisma.listner.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const activeStream = await prisma.currentStream.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      stream: true,
    },
  });

  return NextResponse.json({
    activeStream,
  });
}