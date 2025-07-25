import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import { authOptions } from "../../auth/[...nextauth]/route";

const UpvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
        return NextResponse.json({
            message: "No session or email found"
        }, {status: 401})
    }
    
    const user = await prisma.listner.findFirst({
        where:{
            email: session.user.email
        }
    })

    
    if(!user){
        return NextResponse.json({
            message: "No user found",
        },{status: 403})
    }

    try {
        const body = await req.json()
        const data = UpvoteSchema.parse(body)
        
        const existingUpvote = await prisma.upvote.findFirst({
            where: {
                userId: user.id,
                streamId: data.streamId
            }
        })

        if (existingUpvote) {
            return NextResponse.json({
                message: "Already upvoted"
            }, {status: 409})
        }

        await prisma.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId
            }
        })

        return NextResponse.json({
            message: "Added upvote",
            userId: user.id
        })
    } catch (e) {
        console.error("Upvote error:", e);
        return NextResponse.json({
            message: "Error in Upvotes",
            error: e instanceof Error ? e.message : "Unknown error"
        }, {status: 500})
    }
}