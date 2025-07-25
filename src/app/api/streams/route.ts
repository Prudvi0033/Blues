import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
//@ts-ignore
import youtubesearchapi from 'youtube-search-api'

const streamSchema = z.object({
    creatorId: z.string(),
    url: z.string() 
})

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const data = streamSchema.parse(body)
        const isNotUrl = data.url.includes("youtube") 

        if(!isNotUrl){
            return Response.json({
                message: "Check your URL"
            })
        }
        
        
        const extractedId = data.url.split("?v=")[1]
        const ytData = await youtubesearchapi.GetVideoDetails(extractedId)
        const thumbnailUrl = ytData.thumbnail?.thumbnails?.at(-1)?.url ?? "";

        const stream = await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: ytData.title ?? "can't find title",
                thumbnail: thumbnailUrl
            } 
        })
        return NextResponse.json({
            message: "Added stream",
            id: stream.id
        }, {status: 200})
    } catch (e) {
        console.log(e);
        return NextResponse.json({
                    message: "Error in Streams"
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