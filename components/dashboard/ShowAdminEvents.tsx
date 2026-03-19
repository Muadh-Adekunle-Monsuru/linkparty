"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import React from "react"

export default function ShowAdminEvents({ user_id }: { user_id: string }) {
  const data = useQuery(api.functions.getAdminEvents, {
    creator_id: user_id,
  })
  return (
    <div>
      <p>Your Events:</p>
      <div className="space-y-5 divide-y">
        {data?.map((event) => (
          <div key={event._id} className="space-y-3">
            <p>{event.name}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
