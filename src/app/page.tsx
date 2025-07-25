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
import PieChart from "@/components/Chart";

export default function Home() {

  return (
   <div className=" ">
    <LandingPage/>
     <PieChart positive={12} negative={4} neutral={5} />
    <Description/>
    <Steps/>

   </div>
  );
}
