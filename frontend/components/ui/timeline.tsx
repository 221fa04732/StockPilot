"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  navigateURL : string
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-slate-950 font-sans flex flex-col justify-center items-center"
      ref={containerRef}
    >
      <div className="w-10/12 lg:w-8/12">
        <div className='font-extrabold text-3xl lg:text-5xl flex justify-center items-center w-full text-white'>Our services</div>
      </div>

      <div ref={ref} className="relative w-10/12 lg:w-8/12 pb-16">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-start pt-10 lg:pt-20 lg:gap-10"
          >
            <div className="sticky flex flex-col lg:flex-row z-40 items-center top-40 self-start">
              <div className="h-10 absolute left-3 lg:left-3 w-10  rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden lg:block text-2xl lg:pl-20 lg:text-4xl font-bold text-neutral-500 dark:text-neutral-500 ">
                <Image src={item.title} alt="image" height={250} width={250} className="max-h-32 max-w-32" />
              </h3>
            </div>

            <div className="relative pl-20 pr-4 lg:pl-4 w-full">
              <h3 className="lg:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                <Image src={item.title} alt="image" height={250} width={250} className="max-h-32 max-w-32" />
              </h3>
              <Link href={item.navigateURL}>{item.content}{" "}</Link>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute lg:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
