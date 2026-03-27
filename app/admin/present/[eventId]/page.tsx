"use client"
import PresentPageComponent from "@/components/PresentPageComponent"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import Image from "next/image"
import React from "react"

export default function PresentationPage({ params }: { params: any }) {
  const { isSignedIn, user, isLoaded } = useUser()
  const { eventId } = React.use(params) as any

  if (!isLoaded)
    return (
      <div className="flex h-screen flex-1 flex-col items-center justify-center">
        <Loader className="size-5 animate-spin" /> Loading...
      </div>
    )

  if (!isSignedIn)
    return (
      <div className="flex h-screen flex-1 flex-col items-center justify-center gap-5">
        <Image src={"/no-trips.png"} height={200} width={300} alt="loading" />
        <p>Sign in to present</p>
        <SignInButton>
          <button className="border-2 border-black bg-black px-6 py-2 font-bold text-white transition hover:bg-white hover:text-black">
            Sign In
          </button>
        </SignInButton>
      </div>
    )

  return <PresentPageComponent event_id={eventId} />
}
