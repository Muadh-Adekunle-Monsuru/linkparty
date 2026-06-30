import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-12 flex w-full flex-col items-center justify-between gap-4 rounded-3xl border-8 border-black bg-white px-6 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:flex-row md:px-10 md:py-8 md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6 text-sm font-bold uppercase tracking-wider">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </div>
      <div className="text-sm font-bold uppercase tracking-wider">
        Built by{" "}
        <a
          href="https://www.muadh.com.ng/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Muadh
        </a>
      </div>
    </footer>
  )
}
