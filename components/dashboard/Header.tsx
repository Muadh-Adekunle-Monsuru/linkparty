import Link from "next/link"
import React from "react"
import Logo from "../ui/Logo"
import { Button } from "../ui/button"
import { Show, SignIn, SignInButton, UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <div>
      <div className="border-b-2 border-black px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Link
              href={"/join"}
              className="border-2 border-black bg-white px-6 py-2 font-bold text-black transition hover:bg-black hover:text-white"
            >
              Join Event
            </Link>
            <Show
              when="signed-in"
              fallback={
                <SignInButton>
                  <button className="border-2 border-black bg-black px-6 py-2 font-bold text-white transition hover:bg-white hover:text-black">
                    Sign In
                  </button>
                </SignInButton>
              }
            >
              <UserButton />
            </Show>
          </div>
        </div>
      </div>
    </div>
  )
}
