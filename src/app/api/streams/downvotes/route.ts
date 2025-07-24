import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'

const DownvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest){
    const seesion = await getServerSession()
    const user = await prisma.user.findFirst({
        where:{
            email: seesion?.user?.email
        }
    })

    if(!user){
        return Response.json({
            message: "No user found",
        },{status: 403})
    }

    try {
        const data = DownvoteSchema.parse(req.json())
        await prisma.upvote.delete({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId
                }
            }
        })
    } catch (e) {
        return NextResponse.json({
            message: "Error in downvotes"
        }, {status: 401})
    }
}