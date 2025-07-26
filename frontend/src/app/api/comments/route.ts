import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const {videoUrl}=await req.json()
        if(!videoUrl){
             return NextResponse.json({ error: 'Missing video URL' }, { status: 400 })
        }
        let videoId = ''
    try {
      const url = new URL(videoUrl)
      videoId = url.searchParams.get('v') || ''
      if (!videoId) throw new Error()
    } catch {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }
       const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}`
    )

    const data = await response.json()
    if (!data.items) {
      return NextResponse.json({ error: 'No comments found' }, { status: 404 })
    }

    const comments = data.items.map(
      (item: any) => item.snippet.topLevelComment.snippet
    )

    return NextResponse.json({ comments })
  }

     catch (error) {
  
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
