"use client"
import React from "react"

import { SignInButton, useUser } from "@clerk/nextjs"
import CreateEventButton from "./CreateEventButton"
import Image from "next/image"
import { Loader } from "lucide-react"
export default function AdminPageContents() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded)
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <Loader className="size-5 animate-spin" /> Loading...
      </div>
    )

  if (!isSignedIn)
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-5">
        <Image
          src={"/Loading-Time.png"}
          height={200}
          width={300}
          alt="loading"
        />
        <p>Sign in to create events</p>
        <SignInButton>
          <button className="border-2 border-black bg-black px-6 py-2 font-bold text-white transition hover:bg-white hover:text-black">
            Sign In
          </button>
        </SignInButton>
      </div>
    )

  return (
    <div className="h-full flex-1 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-3">
          <p className="text-4xl font-light">Hello, {user.fullName}</p>
          <p>Manage your events here:</p>
        </div>
        <CreateEventButton />
      </div>
    </div>
  )
}
