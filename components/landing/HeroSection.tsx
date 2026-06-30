import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="flex min-h-fit w-full flex-col overflow-hidden rounded-3xl border-8 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:min-h-[85vh] lg:flex-row dark:border-white dark:bg-black dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
      {/* Left Text Section - White Background */}
      <div className="z-10 flex flex-col justify-center space-y-6 p-6 md:space-y-8 md:p-8 lg:w-1/2 lg:border-r-8 lg:border-black lg:p-16 dark:lg:border-white">
        <div className="inline-block w-fit max-w-full border-4 border-black bg-yellow-400 px-3 py-2 text-sm font-black tracking-wider text-black uppercase md:px-4 md:text-base md:tracking-widest">
          The Ultimate Networking Tool
        </div>

        <h1 className="max-w-xl text-3xl leading-[1.1] font-black uppercase md:text-6xl lg:text-7xl">
          Networking Shouldn&apos;t Be This Easy.
        </h1>

        <p className="text-md max-w-xl font-semibold text-neutral-600 md:text-xl dark:text-neutral-300">
          One event code. One link. A room full of opportunities. The simplest
          way to connect at any event.
        </p>

        <div className="flex w-full flex-col items-stretch gap-4 pt-4 md:flex-row md:flex-wrap md:items-center md:gap-5">
          <Link href={"/join"} className="w-full md:w-auto">
            <Button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border-4 border-black bg-black px-8 py-6 text-lg font-black text-white uppercase transition-all hover:-translate-y-1 hover:bg-yellow-400 hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:w-auto dark:border-white dark:bg-white dark:text-black dark:hover:bg-yellow-400 dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              Join the Party
              <ArrowRight size={24} />
            </Button>
          </Link>

          <Button
            className="w-full rounded-none border-4 border-black bg-white px-8 py-6 text-lg font-black text-black uppercase transition-all hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:w-auto dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
            variant={"outline"}
            asChild
          >
            <Link href={"/admin"} className="w-full justify-center md:w-auto">
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Right Image Container - Colored Background to make the image POP */}
      <div className="relative hidden w-full items-center justify-center border-t-8 border-black p-8 md:flex lg:w-1/2 lg:border-t-0 lg:p-12 dark:border-white dark:bg-blue-900">
        <div className="relative aspect-square w-full max-w-[400px] md:max-w-[500px] lg:h-full lg:w-full lg:max-w-none">
          <Image
            src="/banner_image.png"
            fill
            priority
            alt="People networking at an event"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain lg:object-center"
          />
        </div>
      </div>
    </div>
  )
}
