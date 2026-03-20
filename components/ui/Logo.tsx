import { Waypoints } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 blur-[0.5px]">
      <Image src={"/logo.svg"} height={50} width={50} alt="logo" />
      <p className="hidden font-mono text-3xl font-light uppercase md:block">
        Link Party
      </p>
    </Link>
  )
}
