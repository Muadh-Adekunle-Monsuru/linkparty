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
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Archived Warning Banner */}
      {eventData.is_archived && (
        <div className="mb-8 flex items-center gap-3 border-2 border-red-900 bg-red-100 p-4 text-red-900">
          <Archive size={24} className="shrink-0" />
          <p className="text-sm font-bold tracking-wide uppercase md:text-base">
            This event is currently archived. No new entries can be made, but
            you can view all entries below.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-black bg-neutral-100 md:aspect-[4/3] lg:aspect-square">
            {eventData?.flier_url ? (
              <Image
                src={eventData.flier_url}
                alt={`${eventData.name || "Event"} flier`}
                fill
                className="object-cover" // Swapped 'contain' for 'object-cover' to fill the brutalist frame neatly
                priority
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-neutral-400">
                <Image
                  src="/no-trips.png"
                  width={150}
                  height={100}
                  alt="No flier"
                  className="opacity-50 grayscale"
                />
                <p className="mt-4 font-bold uppercase">No Flier Provided</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <h1 className="mb-6 text-4xl leading-tight font-black text-black uppercase md:text-5xl md:leading-none">
            {eventData?.name}
          </h1>

          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 border-2 border-black bg-yellow-300 px-4 py-2 font-bold text-black uppercase">
              <Calendar size={18} />
              <span>{eventData.event_date || "TBD"}</span>
            </div>
            <div className="flex items-center gap-2 border-2 border-black bg-blue-200 px-4 py-2 font-bold text-black uppercase">
              <MapPin size={18} />
              <span>{eventData.location || "TBA"}</span>
            </div>
          </div>

          <div className="rounded-xl border-2 border-neutral-200 bg-neutral-50 p-6">
            <div className="mb-3 flex items-center gap-2 text-neutral-500">
              <Info size={18} />
              <h3 className="font-bold tracking-wide uppercase">
                About this event
              </h3>
            </div>
            <p className="text-sm leading-relaxed font-light whitespace-pre-wrap text-black">
              {eventData?.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
