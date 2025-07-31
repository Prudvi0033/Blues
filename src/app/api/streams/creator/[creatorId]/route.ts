import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/options";
import prisma from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ creatorId: string }> }
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

  // Await the params Promise
  const { creatorId } = await context.params;

  const [streams, activeStream] = await Promise.all([
    prisma.stream.findMany({
      where: { userId: creatorId, active: true },
      include: {
        _count: {
          select: { upvotes: true },
        },
        upvotes: {
          where: { userId: viewer.id },
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