"use client"
import { AddLinkFloatButton } from "@/components/AddLinkedInButton"
import Header from "@/components/dashboard/Header"
import AttendeeListComponents from "@/components/event/AttendeeListComponents"
import ErrorComponent from "@/components/event/ErrorComponent"
import EventPageDetails from "@/components/event/EventPageDetails"
import { BrutalistSearchBar } from "@/components/SearchBar"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/Logo"
import { Spinner } from "@/components/ui/spinner"
import { api } from "@/convex/_generated/api"
import { useAuth } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

export default function EventPage({ params }: { params: any }) {
  const { eventId } = React.use(params) as any

  const eventData = useQuery(api.functions.getEventDetails, {
    event_id: eventId,
  })

  const auth = useAuth()

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
    <div className="bg-custom-pattern w-full bg-white bg-fixed">
      <div className="mx-auto min-h-screen max-w-7xl p-3">
        <Logo />
        <EventPageDetails eventData={eventData} />
        <div className="mx-auto mt-5 max-w-6xl border-t-4 border-black px-1 py-8 pt-12 md:py-12">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-5">
            <h2 className="text-xl font-black text-black uppercase md:text-3xl">
              Attendees
            </h2>
            {!eventData.is_archived && (
              <AddLinkFloatButton event_id={eventId} />
            )}
          </div>

          <div className="min-h-[200px] rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-3 text-center">
            <AttendeeListComponents
              event_id={eventId}
              is_admin={auth.userId == eventData.creator_id}
              admin_id={auth.userId || ""}
            />
          </div>
        </div>
        {/* //List of attendeness will be displayed below */}
      </div>
    </div>
  )
}
