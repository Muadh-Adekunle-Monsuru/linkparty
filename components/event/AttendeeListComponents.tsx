"use client"
import { api } from "@/convex/_generated/api"
import Avatar from "boring-avatars"
import { useMutation, useQuery } from "convex/react"
import { Award } from "lucide-react"
import { useState } from "react"
import { BrutalistSearchBar } from "../SearchBar"
import { Button } from "../ui/button"

const PARTY_COLORS = ["#FFAD60", "#FFEE63", "#96CEB4", "#FFEEAD", "#D9534F"]
const getInterestColor = (interest: string) => {
  // Normalize the string to make matching easier (lowercase, no spaces)
  const normalized = interest
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")

  const colors: any = {
    frontend: "bg-yellow-300",
    backend: "bg-blue-300",
    fullstack: "bg-green-300",
    cybersec: "bg-red-400",
    cybersecurity: "bg-red-400",
    "ui-ux": "bg-pink-300",
    "ui-ux-design": "bg-pink-300",
    "data-science": "bg-purple-300",
    devops: "bg-orange-300",
  }

  // Return the matched color, or a default gray if it's not in the list
  return colors[normalized] || "bg-neutral-200"
}

export default function AttendeeListComponents({
  event_id,
  is_admin,
  admin_id,
}: {
  event_id: string
  is_admin: boolean
  admin_id: string
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilters, setSearchFilters] = useState([])
  const attendees = useQuery(api.functions.getEventAttendees, { event_id })
  const vip_mutation = useMutation(api.functions.toggleVIP)

  if (attendees == undefined) return <div>Loading...</div>
  if (attendees == "error")
    return <div>Could not getting event attendees...</div>

  const filteredAttendees = attendees.filter((attendee) => {
    if (!attendee.name) return false

    const searchLower = searchTerm.toLowerCase()

    // Check name
    const nameMatch = attendee.name?.toLowerCase().includes(searchLower)

    // Check interests
    const interestMatch = attendee.interests?.some((interest) =>
      interest.toLowerCase().includes(searchLower)
    )

    return nameMatch || interestMatch
  })

  const handleClick = (attendee_id: any, is_vip: boolean) => {
    vip_mutation({ admin_id, attendee_id, event_id, is_vip: !is_vip })
  }

  return (
    <div>
      {attendees.length == 0 ? (
        <div className="p-12 text-center">
          <p className="mb-4 text-lg font-bold">
            {attendees.length === 0
              ? "No attendees yet"
              : "No attendees match your search"}
          </p>
          {attendees.length === 0 && (
            <p className="text-gray-600">
              Share the event code to get people to join!
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="pb-5">
            <BrutalistSearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAttendees.map((attendee) => (
              <div
                key={attendee._id}
                className="relative flex flex-col space-y-1 rounded-xl border-2 border-black bg-white p-3 transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {(is_admin || attendee.is_vip) && (
                  <Button
                    variant={"ghost"}
                    disabled={!is_admin}
                    className="absolute -top-5 -left-5"
                    onClick={() =>
                      handleClick(attendee._id, attendee.is_vip || false)
                    }
                    title={attendee.is_vip ? "Remove VIP" : "Make VIP"}
                  >
                    <Award
                      className={`size-12 text-muted-foreground ${attendee.is_vip && "fill-amber-500 text-yellow-500"} rotate-5`}
                      strokeWidth={0.8}
                    />
                  </Button>
                )}
                <div className="flex h-full grow items-center justify-between space-x-2 md:flex-col md:space-y-4 md:p-2">
                  <div className="mb-2 flex items-center gap-4">
                    <div className="shrink-0 overflow-hidden rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Avatar
                        size={56}
                        name={attendee.name} // Uses the name as a seed so the avatar is consistent
                        variant="beam" // "beam", "marble", "pixel", "sunset", "ring", "bauhaus"
                        colors={PARTY_COLORS}
                      />
                    </div>
                  </div>
                  <div className="w-full md:space-y-3">
                    <h3 className="line-clamp-2 text-lg font-black uppercase md:text-xl">
                      {attendee.name}
                    </h3>
                    <div className="hidden flex-wrap gap-2 md:flex">
                      {(attendee.interests || []).map((interest, idx) => (
                        <span
                          key={idx}
                          className={`w-fit p-1 text-xs font-light text-black uppercase md:border-2 md:border-black md:px-2 md:py-1 ${getInterestColor(
                            interest
                          )}`}
                        >
                          {interest}
                        </span>
                      ))}
                      {(!attendee.interests ||
                        attendee.interests.length === 0) && (
                        <span className="hidden text-sm font-medium text-neutral-400 italic md:block">
                          No interest selected
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={attendee.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-fit items-center justify-center gap-2 border-2 border-black bg-black p-2 px-3 font-bold text-white uppercase transition hover:bg-white hover:text-black md:w-full md:px-4 md:py-3"
                  >
                    <span>Connect</span>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 md:hidden">
                  {(attendee.interests || []).map((interest, idx) => (
                    <span
                      key={idx}
                      className={`w-fit rounded-full px-1 text-xs font-light text-black uppercase md:border-2 md:border-black md:px-2 md:py-1 ${getInterestColor(
                        interest
                      )}`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
