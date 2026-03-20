"use client"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Copy, Eye, EyeOff, Lock, Play, Trash2, Unlock } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

export default function ShowAdminEvents({ user_id }: { user_id: string }) {
  const data = useQuery(api.functions.getAdminEvents, {
    creator_id: user_id,
  })
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }
  return (
    <div>
      <p className="mb-5 text-2xl font-medium">Your Events:</p>
      <div className="mb-12 grid grid-cols-1 gap-6">
        {data?.map((event) => (
          <div
            key={event._id}
            className="rounded-xl border-2 border-black p-8 transition hover:bg-neutral-50"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-grow">
                <h3 className="font-Medium mb-3 text-2xl">{event.name}</h3>
                <div className="mb-4 flex flex-wrap gap-4">
                  <div className="bg-black px-4 py-2 text-sm font-bold text-white">
                    CODE: {event.code}
                  </div>
                  {!event.is_open && (
                    <div className="border-2 border-red-900 bg-red-100 px-4 py-2 text-sm font-bold text-red-900">
                      CLOSED
                    </div>
                  )}
                  {event.is_archived && (
                    <div className="bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700">
                      ARCHIVED
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => copyCode(event.code)}
                  className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-bold text-black transition hover:bg-black hover:text-white"
                  title="Copy code"
                >
                  <Copy size={18} />
                  {copiedCode === event.code ? "COPIED" : "COPY"}
                </button>

                <Link
                  href={`/event/${event._id}`}
                  className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-bold text-black transition hover:bg-black hover:text-white"
                  title="View directory"
                >
                  <Eye size={18} />
                  VIEW
                </Link>

                <Link
                  href={`/admin/present/${event._id}`}
                  className="flex items-center gap-2 border-2 border-black bg-black px-4 py-2 font-bold text-white transition hover:bg-white hover:text-black"
                  title="Present mode"
                >
                  <Play size={18} />
                  PRESENT
                </Link>

                <button
                  // onClick={() => toggleAccessClosed(event.id, event.access_closed)}
                  className={`flex items-center gap-2 border-2 px-4 py-2 font-bold transition ${
                    !event.is_open
                      ? "border-green-900 bg-green-100 text-green-900 hover:bg-green-200"
                      : "border-yellow-900 bg-yellow-100 text-yellow-900 hover:bg-yellow-200"
                  }`}
                  title={
                    !event.is_open
                      ? "Open registrations"
                      : "Close registrations"
                  }
                >
                  {!event.is_open ? <Unlock size={18} /> : <Lock size={18} />}
                </button>

                <button
                  // onClick={() => toggleVisibility(event.id, event.is_visible)}
                  className={`flex items-center gap-2 border-2 px-4 py-2 font-bold transition ${
                    event.is_archived
                      ? "border-blue-900 bg-blue-100 text-blue-900 hover:bg-blue-200"
                      : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title={event.is_archived ? "Hide event" : "Show event"}
                >
                  {event.is_archived ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

                <button
                  // onClick={() => toggleArchive(event.id, event.is_archived)}
                  className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-bold text-black transition hover:bg-black hover:text-white"
                  title="Archive event"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
