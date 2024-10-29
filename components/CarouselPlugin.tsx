"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="container max-w-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 100 }).map((_, index) => (
          <>
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2 border-8 border-gray-500">
                    <h2 className="items-center justify-center pb-2 text-5xl">
                      Food
                    </h2>
                    <Image
                      src="/img/food.jpg"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2 border-8 border-gray-500">
                    <h2 className="items-center justify-center pb-2 text-5xl">
                      Fashion
                    </h2>
                    <Image
                      src="/img/fashion.jpg"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2 border-8 border-gray-500">
                    <h2 className="items-center justify-center pb-2 text-5xl">
                      Travel
                    </h2>
                    <Image
                      src="/img/travel.jpg"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2 border-8 border-gray-500">
                    <h2 className="items-center justify-center pb-2 text-5xl">
                      Music
                    </h2>
                    <Image
                      src="/img/music.jpg"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2 border-8 border-gray-500">
                    <h2 className="items-center justify-center pb-2 text-5xl">
                      Sport
                    </h2>
                    <Image
                      src="/img/sport.jpg"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
