import { CarouselPlugin } from "@/components/CarouselPlugin";

import React from "react";

const page = () => {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-1/2 pb-10">
        <p className="special-word text-sm font-bold">
          Your Words, Your World.
        </p>
        <h1 className="pb-5">
          Dive deep into the <span className="special-word">world</span> <br />
          of <span className="special-word">thoughts</span>
        </h1>
        <p>
          Welcome to BlogSpace, where ideas take flight. This is your platform
          to express, explore, and connect with a global community of writers
          and thinkers. Whether you're sharing a story, an opinion, or
          knowledge, BlogSpace is your digital canvas. Join us and let your
          voice be heard.
        </p>
      </div>
      <div className="hidden md:block basis-1/2 pt-24">
        <CarouselPlugin />
      </div>
    </div>
  );
};

export default page;
