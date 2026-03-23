"use client"
import { AddLinkFloatButton } from "@/components/AddLinkedInButton"
import Header from "@/components/dashboard/Header"
import ErrorComponent from "@/components/event/ErrorComponent"
import EventPageDetails from "@/components/event/EventPageDetails"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/Logo"
import { Spinner } from "@/components/ui/spinner"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function EventPage({ params }: { params: any }) {
  const { eventId } = React.use(params) as any
  const eventData = useQuery(api.functions.getEventDetails, {
    event_id: eventId,
  })

  if (eventData == undefined)
    return (
      <div className="h-svh">
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <Spinner />
          <p>Loading...</p>
        </div>
      </div>
    )

  if (eventData == "error") return <ErrorComponent />

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-white p-4">
      <Logo />
      <EventPageDetails eventData={eventData} />
      <div className="mx-auto mt-16 max-w-6xl border-t-4 border-black px-4 py-8 pt-12 md:py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-black uppercase">
            Attendees
          </h2>
          <AddLinkFloatButton event_id={eventId} />
        </div>
        <div className="min-h-[200px] rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
          <p className="font-medium text-neutral-500">
            Attendee list component goes here.
          </p>
        </div>
      </div>
      {/* //List of attendeness will be displayed below */}
    </div>
  )
}
