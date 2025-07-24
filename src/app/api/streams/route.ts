import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'

const streamSchema = z.object({
    creatorId: z.string(),
    url: z.string() 
})

export async function POST(req: NextRequest){
    try {
        const data = streamSchema.parse(req.json())
        const isNotUrl = data.url.includes("youtube") || data.url.includes("spotify")

        if(!isNotUrl){
            return Response.json({
                message: "Check your URL"
            })
        }

        const extractedId = data.url.split("?v=")[1]

        await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        })
    } catch (e) {
        return NextResponse.json({
                    message: "Error in Upvotes"
                }, {status: 401})
    }
}

export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId")
    const streams = await prisma.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}