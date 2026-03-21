"use client"
import { create_event } from "@/lib/server"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
export default function CreateEventButton({ user_id }: { user_id: string }) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [newEventFlier, setNewEventFlier] = useState("")
  const [date, setDate] = React.useState("")
  const [error, setError] = useState("")

  const [creatingEvent, setCreatingEvent] = useState(false)
  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCreatingEvent(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const file = formData.get("flier") as File

    if (!file || !file.type.startsWith("image")) {
      setError("Flier is required and only images are allowed")
      setCreatingEvent(false)
      return
    }

    await create_event({ formData, creator_id: user_id })
      .then((response) => {
        console.log(response)
        toast.success("Event created succesfully")
        setNewEventTitle("")
        setNewEventDescription("")
        setNewEventLocation("")
        setDate("")
        setNewEventFlier("")
        setCreatingEvent(false)
        setShowCreateForm(false)
      })
      .catch((error) => {
        console.log("Error")
        toast.error("Error creating event")
        setError(`Error creating event`)
      })
  }
  return (
    <div>
      {!showCreateForm && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="mb-12 flex items-center gap-2 rounded-lg border-3 border-black bg-black px-3 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black"
        >
          <Plus size={24} />
          CREATE NEW EVENT
        </button>
      )}

      {showCreateForm && (
        <div
          className={`mb-12 rounded-4xl border-4 border-black p-8 ${error ? "border-red-700" : "border-black"}`}
        >
          <h2 className="mb-6 text-3xl font-black">CREATE NEW EVENT</h2>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div>
              <label className="mb-2 block text-lg font-bold">
                Event Title
              </label>
              <input
                type="text"
                value={newEventTitle}
                name="title"
                id="title"
                onChange={(e) => setNewEventTitle(e.target.value)}
                required
                placeholder="Tech Conference 2026"
                className="w-full rounded-4xl border-2 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">
                Describe your event
              </label>
              <textarea
                value={newEventDescription}
                name="description"
                id="description"
                onChange={(e) => setNewEventDescription(e.target.value)}
                placeholder="The biggest tech conference in Africa is here again..."
                className="w-full rounded-lg border-2 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">
                Event location
              </label>
              <input
                type="text"
                value={newEventLocation}
                name="location"
                id="location"
                required
                onChange={(e) => setNewEventLocation(e.target.value)}
                placeholder="Eko Hotel, Ikeja, Lagos State"
                className="w-full rounded-4xl border-2 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">Event date</label>
              <input
                type="date"
                value={date}
                name="date"
                id="date"
                required
                onChange={(e) => setDate(e.target.value)}
                placeholder="Tech Conference 2026"
                className="w-fit rounded-4xl border-2 border-black p-4 text-lg transition focus:outline-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold">
                Event Flier*
              </label>
              <input
                accept="image/*"
                type="file"
                name="flier"
                id="flier"
                required
                className="w-full rounded-4xl border-2 border-black p-4 text-lg focus:outline-4"
              />
            </div>
            {error && (
              <p className="text-lg text-red-600">
                Error creating event: {error}
              </p>
            )}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={creatingEvent || !newEventTitle.trim()}
                className="border-3 border-black bg-black px-8 py-3 font-bold text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {creatingEvent ? (
                  <div className="flex items-center gap-2">
                    <Spinner />
                    <p>Creating...</p>
                  </div>
                ) : (
                  "Create Event"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false)
                  setError("")
                  setCreatingEvent(false)
                }}
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
