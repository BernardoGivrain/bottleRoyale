"use client";
import React from "react";
import { Spotlight } from "./spotlight-new";

export function SpotlightNewDemo() {
  return(
    <div
      className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
  <Spotlight />
  <div className=" p-4 max-w-7xl  mx-auto relative z-50  w-full pt-20 md:pt-0">
        <h1
          className="text-4xl md:text-7xl font-bold text-center" style={{fontFamily: 'Raleway', fontWeight: '300', color: '#e0d163ff'}}>
          Alcohol Bottle Handler
        </h1>
        <p
          className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto" style={{fontFamily: 'Nunito Sans', color: '#ffffffff', fontSize: '18px'}}>
          A simple way to register the alcohol bottles of a flight and get a solution for their further use.
        </p>
      </div>
    </div>
  );
}