import { Id } from "@/convex/_generated/dataModel"
import { Archive, Calendar, Info, MapPin } from "lucide-react"
import Image from "next/image"
import React from "react"

interface EventData {
  _id: Id<"events">
  _creationTime: number
  flier_url?: string | undefined
  code: string
  name: string
  description: string
  is_open: boolean
  is_archived: boolean
  location: string
  event_date: string
  creator_id: string
}
export default function EventPageDetails({
  eventData,
}: {
  eventData: EventData
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div
        style={{ backgroundImage: `url(${eventData.flier_url})` }}
        className={`relative h-64 w-full rounded-2xl bg-cover bg-no-repeat`}
      >
        <div className="absolute inset-0 rounded-2xl bg-black/60"></div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-4">
          <h2 className="text-center text-4xl font-bold text-white md:text-6xl">
            {eventData?.name}
          </h2>

          <div className="flex gap-3 px-4 text-sm">
            <div className="flex items-center gap-2 font-light text-neutral-300 uppercase">
              <Calendar size={18} className="text-blue-500" />
              <span className="line-clamp-1">
                {eventData.event_date || "TBD"}
              </span>
            </div>
            <div className="flex items-center gap-2 font-light text-neutral-300 uppercase">
              <MapPin size={18} className="text-red-600" />
              <span className="line-clamp-1">
                {eventData.location || "TBA"}
              </span>
            </div>
          </div>
          {eventData.is_archived && (
            <div className="border-red flex w-fit items-center gap-3 rounded-full border bg-red-100 p-1 px-2 text-xs text-red-900">
              <Archive size={14} className="shrink-0" />
              <p>Archive Mode</p>
            </div>
          )}
          {!eventData.is_open && (
            <div className="border-red flex w-fit items-center gap-3 rounded-full border bg-red-100 p-1 px-2 text-xs text-red-900">
              <Archive size={14} className="shrink-0" />
              <p>Closed</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
