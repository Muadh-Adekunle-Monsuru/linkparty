"use client"
import { get_event_by_code } from "@/lib/server"
import { AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function JoinCard() {
  const [error, setError] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // const query = useQuery(api.functions.getEventByCode)

  const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    await get_event_by_code({ formData })
      .then((res) => {
        router.push(`/event/${res}`)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setError("Event not found or code is invalid")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-full max-w-md rounded-xl border-4 border-black p-6 md:p-12">
      <h1 className="mb-2 text-2xl font-black md:text-4xl">JOIN EVENT</h1>
      <p className="mb-8 text-sm leading-relaxed md:text-lg">
        Enter the event code to get started
      </p>

      <form onSubmit={handleCodeSubmit} className="space-y-6">
        {error && (
          <div className="flex gap-3 border-3 border-red-700 bg-white p-4 text-red-500">
            <AlertCircle className="flex-shrink-0" size={20} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        <div>
          <label className="mb-2 block text-lg font-bold">Event Code</label>
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
            maxLength={6}
            className="w-full border-3 border-black p-4 text-center text-2xl font-black tracking-widest uppercase transition focus:bg-black focus:text-white focus:outline-none"
            disabled={loading}
          />
          <p className="mt-2 text-sm text-gray-600">
            6-character code provided by the event organizer
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="flex w-full items-center justify-center gap-2 border-3 border-black bg-black py-4 text-lg font-black text-white transition hover:bg-white hover:text-black disabled:opacity-50"
        >
          {loading ? "Validating..." : "Continue"}
          {!loading && <ArrowRight size={20} />}
        </button>

        <p className="text-center text-sm">
          Don't have a code?{" "}
          <Link href="/admin" className="font-bold underline">
            Create an event
          </Link>
        </p>
      </form>
    </div>
  )
}
