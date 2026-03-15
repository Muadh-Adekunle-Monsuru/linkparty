import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="flex h-[90svh] w-full flex-col items-center justify-between overflow-hidden rounded-4xl border-4 border-black bg-white shadow-2xl lg:flex-row dark:border-white dark:bg-black">
      {/* Text Section */}
      <div className="z-10 flex flex-col justify-center space-y-5 p-8 lg:w-1/2 lg:p-10">
        <p className="max-w-xl text-4xl font-black md:text-6xl lg:text-7xl">
          Networking Shouldn&apos;t Be This Easy.
        </p>
        <p className="max-w-xl text-lg font-light not-dark:text-neutral-700 md:text-xl">
          One event code. One link. A room full of opportunities. The simplest
          way to connect at any event.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Button className="border" asChild>
            <Link
              href={"/join"}
              className="flex items-center gap-2 border-black p-6 transition hover:bg-white hover:text-black"
            >
              Join the Party
              <ArrowRight size={20} />{" "}
            </Link>
          </Button>
          <Button
            className="border-black p-6 transition hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:text-white"
            variant={"outline"}
          >
            <Link href={"/admin"}>Create Event</Link>
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative flex w-full items-center justify-center p-4 lg:h-full lg:w-1/2 lg:justify-end lg:p-0">
        <div className="relative aspect-square w-full max-w-[400px] md:max-w-[500px] lg:h-full lg:w-auto lg:max-w-none">
          <Image
            src="/banner_image.png"
            fill
            priority
            alt="events"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain lg:object-right"
          />
        </div>
      </div>
    </div>
  )
}
