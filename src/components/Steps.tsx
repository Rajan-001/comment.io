import React from 'react'

type Props = {}

export const Steps = (props: Props) => {
    return (
        <div className='flex flex-row gap-4'>
            <div>
                <strong>1️⃣ Paste & Analyze</strong>
                <br />
                Insert any public YouTube video link into the tool to get started. It works instantly with any accessible video content.
            </div>
            <div>
                <strong>2️⃣ Deep AI Breakdown</strong>
                <br />
                Behind the scenes, our AI dives into the comments — detecting tone, surfacing trends, and pulling out key topics with advanced natural language understanding.
            </div>
            <div>
                <strong>3️⃣ Insightful Dashboard</strong>
                <br />
                Get a clear, visual summary of audience sentiment, popular keywords, and recurring feedback — all in one place, ready for review or download.
            </div>
            <div>
                <strong>4️⃣ Optimize Your Strategy</strong>
                <br />
                Apply what you’ve learned to refine your content, connect better with your viewers, or guide creative and marketing decisions with confidence.
            </div>
        </div>
    )
}