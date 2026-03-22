import React from "react"
import Header from "../dashboard/Header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export default function ErrorComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-6 rounded-xl border-2 border-black bg-neutral-50 px-6 py-12 text-center">
          <div className="relative mb-2 opacity-90 transition-opacity duration-300 hover:opacity-100">
            <Image
              src="/Chill-Time.png"
              height={200}
              width={300}
              alt="Event not found illustration"
              className="pointer-events-none drop-shadow-sm"
            />
          </div>

          <div className="max-w-sm">
            <h2 className="mb-3 text-2xl font-bold text-black uppercase">
              Party Not Found
            </h2>
            <p className="mb-8 text-neutral-600">
              We couldn't locate this event. It may have ended, been deleted, or
              the link might be incorrect.
            </p>

            {/* Expanded CTA to be full-width of its container for a stronger click target */}
            <Link href="/join" className="inline-block w-full">
              <Button className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-black bg-black px-6 py-6 text-base font-bold text-white uppercase transition hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                Join a Party
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
