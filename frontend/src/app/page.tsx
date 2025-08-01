"use client"
import { useEffect, useState } from "react";
import { GiLynxHead } from "react-icons/gi";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { ImDownload2 } from "react-icons/im";
import { MdCollectionsBookmark } from "react-icons/md";
import { LandingPage } from "@/components/LandingPage";
import { Description } from "@/components/Description";
import { Steps } from "@/components/Steps";
import SignInModal from "@/components/SignIn";

export default function Home() {

  return (
   <div className=" ">
    <SignInModal/>
{/*      
    <Description/>
    <Steps/> */}

   </div>
  );
}



//  <span class="pie-wrap">
// 	<span class="pie-r"><span></span></span>
// 	<span class="pie-l"><span></span></span>
// 	<span class="text">Now Loading</span>
// </span>