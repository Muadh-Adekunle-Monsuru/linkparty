import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="flex w-full items-center justify-center rounded-3xl border-8 border-black bg-white px-6 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:px-10 md:py-6 md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] md:dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="LinkParty Logo"
          width={36}
          height={36}
          className="h-8 w-8 md:h-10 md:w-10"
        />
        <span className="text-3xl font-black tracking-tighter uppercase md:text-4xl">
          LINKPARTY
        </span>
      </Link>
    </header>
  )
}
