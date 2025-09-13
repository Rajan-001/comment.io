import { BsRocketTakeoff } from "react-icons/bs";
import { FaChartPie, FaRegChartBar } from "react-icons/fa";
import { LiaGemSolid } from "react-icons/lia";
import { MdEmojiEmotions } from "react-icons/md";

 export  const features=[
          {
            title: "Spot Trends Instantly",
            text: "Identify the hottest topics, recurring themes, and key talking points your audience cares about most — without scrolling through hundreds of comments.",
            icons:FaChartPie,
            color:"oklch(71.5% 0.143 215.221)"
          },
          {
            title: " Understand Sentiment at a Glance",
            text: "Instantly see the balance of positive, negative, and neutral reactions in your comment section with easy-to-read charts and summaries.",
             icons:MdEmojiEmotions,
             color:"oklch(72.3% 0.219 149.579)"
          },
          {
            title: "Find Hidden Gems",
            text: "Unearth valuable feedback, unique perspectives, and unexpected insights that might otherwise get buried in the noise.",
            icons:LiaGemSolid,
            color:"oklch(42.4% 0.199 265.638)"
          },
          {
            title: "Visualize the Conversation",
            text: "Beautiful, share-ready charts and summaries make it easy to showcase your audience’s voice in reports, marketing pitches, or social media posts.",
            icons:FaRegChartBar,
            color:"oklch(55.2% 0.016 285.938)"
          },
          {
            title: " Future-Ready",
            text: "We’re constantly adding new capabilities — from analyzing thousands of comments per video to expanding across platforms like Reddit and TikTok.",
            icons:BsRocketTakeoff,
            color:"oklch(52.5% 0.223 3.958)"
          }
]
