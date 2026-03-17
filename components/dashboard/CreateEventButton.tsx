"use client"
import { Plus } from "lucide-react"
import React, { useState } from "react"

export default function CreateEventButton() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [creatingEvent, setCreatingEvent] = useState(false)
  const handleCreateEvent = () => {}
  return (
    <div>
      {!showCreateForm && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="mb-12 flex items-center gap-2 border-3 border-black bg-black px-8 py-4 text-lg font-black text-white transition hover:bg-white hover:text-black"
        >
          <Plus size={24} />
          CREATE NEW EVENT
        </button>
      )}

      {showCreateForm && (
        <div className="mb-12 border-4 border-black p-8">
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
                className="w-full border-3 border-black p-4 text-lg transition focus:bg-black focus:text-white focus:outline-none"
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
