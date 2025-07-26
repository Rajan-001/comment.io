import React from 'react'

type Props = {}

export const Description = (props: Props) => {
  return (
    <div className=' flex flex-col text-black px-12 py-8'>
        <div> The YouTube Comment Analyzer</div>
        <div>
            The YouTube Comment Analyzer is a web-based tool that allows users to input a YouTube video URL and automatically fetch and analyze the comments. It leverages natural language processing (NLP) and sentiment analysis techniques to classify comments as positive, negative, or neutral. The tool also highlights common keywords, identifies trends, filters spam or bot-like activity, and provides data visualizations such as sentiment charts and word clouds.
        </div>
        <div className='w-full h-[80vh] flex flex-row'>
            <div>
                <div>Smart Comment Summarization</div>
                <div>Too many comments? No problem. Our tool highlights key themes, trending phrases, and top reactions so you get the full picture without reading every word.</div>  
             </div>

             <div>
            📊<div> Audience Pulse at a Glance</div>
            <div>
            Visualize how your video is performing emotionally. Real-time charts and keyword breakdowns make it easy to spot patterns and make data-driven decisions.
            </div>
            </div>

            <div>
                <div>
                    Emotion-Driven Feedback Mapping
                  </div>
                  <div></div>
                  Quickly uncover how viewers feel about your content. Our intelligent analyzer identifies emotional tones across all comments — from praise to criticism — with clarity and accuracy.
            </div>

        </div>
    </div>
  )
}