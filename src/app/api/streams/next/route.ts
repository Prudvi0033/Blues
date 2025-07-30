import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const user = await prisma.listner.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "No user found" }, { status: 404 });
  }

  const mostUpvotedStream = await prisma.stream.findFirst({
    where: {
      userId: user.id,
      active: true, // Only get active streams
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  if (!mostUpvotedStream) {
    return NextResponse.json({ message: "No streams available" }, { status: 404 });
  }

  await Promise.all([
    prisma.currentStream.upsert({
      where: {
        userId: user.id,
      },
      update: {
        streamId: mostUpvotedStream.id,
      },
      create: {
        userId: user.id,
        streamId: mostUpvotedStream.id,
      },
    }),
    // Mark the stream as inactive instead of deleting
    prisma.stream.update({
      where: {
        id: mostUpvotedStream.id,
      },
      data: {
        active: false,
      },
    }),
  ]);

  return NextResponse.json({ mostUpvotedStream });
}