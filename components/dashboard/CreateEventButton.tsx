"use client"
import { useMutation } from "convex/react"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { api } from "@/convex/_generated/api"
import { nanoid } from "nanoid"
import { toast } from "sonner"
export default function CreateEventButton({ user_id }: { user_id: string }) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [newEventFlier, setNewEventFlier] = useState("")
  const [date, setDate] = React.useState("")

  const [creatingEvent, setCreatingEvent] = useState(false)
  const create = useMutation(api.functions.myMutationFunction)
  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCreatingEvent(true)

    await create({
      code: nanoid(6),
      description: newEventDescription.trim(),
      event_date: date,
      is_archived: false,
      is_open: false,
      location: newEventLocation,
      name: newEventTitle,
      creator_id: user_id,
    })
      .then((response) => {
        console.log(response)
        toast.success("Event created succesfully")
        setNewEventTitle("")
        setNewEventDescription("")
        setNewEventLocation("")
        setDate("")
        setNewEventFlier("")
      })
      .catch((error) => {
        toast.error("Error creating event", {
          description: `${JSON.stringify(error)}`,
        })
      })
    setCreatingEvent(false)
    setShowCreateForm(false)
  }
  return (
    <div>
      {!showCreateForm && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="mb-12 flex items-center gap-2 border-3 border-black bg-black px-3 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black"
        >
          <Plus size={24} />
          CREATE NEW EVENT
        </button>
      )}

      {showCreateForm && (
        <div className="mb-12 border-2 border-black p-8">
          <h2 className="mb-6 text-3xl font-black">CREATE NEW EVENT</h2>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div>
              <label className="mb-2 block text-lg font-bold">
                Event Title
              </label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Tech Conference 2026"
                className="w-full border-2 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">
                Describe your event
              </label>
              <textarea
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                placeholder="The biggest tech conference in Africa is here again..."
                className="w-full border-3 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">
                Event location
              </label>
              <input
                type="text"
                value={newEventLocation}
                onChange={(e) => setNewEventLocation(e.target.value)}
                placeholder="Eko Hotel, Ikeja, Lagos State"
                className="w-full border-3 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">Event date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Tech Conference 2026"
                className="w-fit border-3 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">
                Event Flier
              </label>
              <input
                accept="imgage"
                type="file"
                value={newEventFlier}
                onChange={(e) => setNewEventFlier(e.target.value)}
                className="w-full border-3 border-black p-4 text-lg focus:outline-4"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={creatingEvent || !newEventTitle.trim()}
                className="border-3 border-black bg-black px-8 py-3 font-bold text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {creatingEvent ? "Creating..." : "Create Event"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="border-3 border-black bg-white px-8 py-3 font-bold text-black transition hover:bg-black hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
