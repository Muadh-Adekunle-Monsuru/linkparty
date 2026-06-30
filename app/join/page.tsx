"use client"
import JoinCard from "@/components/JoinCard"
import Logo from "@/components/ui/Logo"

export default function page() {
  return (
    <div className="mx-auto flex h-svh max-w-7xl flex-col p-4">
      <Logo />
      <div className="flex flex-grow items-center justify-center py-12">
        <JoinCard />
      </div>
    </div>
  )
}
