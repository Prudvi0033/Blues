// File: /api/streams/creator/[creatorId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const viewer = await prisma.listner.findUnique({
    where: { email: session.user.email },
  });

  if (!viewer) {
    return NextResponse.json({ message: "User not found" }, { status: 403 });
  }

  const { creatorId } = params;

  const [streams, activeStream] = await Promise.all([
    prisma.stream.findMany({
      where: { userId: creatorId, active: true },
      include: {
        _count: {
          select: { upvotes: true },
        },
        upvotes: {
          where: { userId: viewer.id }, // check if **viewer** has upvoted
        },
      },
    }),
    prisma.currentStream.findFirst({
      where: {
        userId: viewer.id,
      },
      include: {
        stream: true,
      },
    }),
  ]);

  return NextResponse.json({
    streams: streams.map(({ _count, upvotes, ...rest }) => ({
      ...rest,
      upvotes: _count.upvotes,
      hasUpvoted: upvotes.length > 0,
    })),
    activeStream,
  });
}
