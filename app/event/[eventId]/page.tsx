"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import React from "react"

export default function EventPage({ params }: { params: any }) {
  const { eventId } = React.use(params) as any
  const eventData = useQuery(api.functions.getEventDetails, {
    event_id: eventId,
  })
  return (
    <div>
      <p>{eventData?.name}</p>
      <p>{eventData?.description}</p>
    </div>
  )
}
