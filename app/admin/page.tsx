import AdminPageContents from "@/components/dashboard/AdminPageContents"
import CreateEventButton from "@/components/dashboard/CreateEventButton"
import Header from "@/components/dashboard/Header"
import Logo from "@/components/ui/Logo"
import { UserButton } from "@clerk/nextjs"
import React from "react"

export default function Page() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <AdminPageContents />
    </div>
  )
}
