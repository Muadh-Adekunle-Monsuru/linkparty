"use client" // Error components must be Client Components

import { useEffect } from "react"
import Link from "next/link"
import { AlertOctagon, RotateCcw, Home } from "lucide-react"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log the error to an error reporting service (like Sentry) if needed
  useEffect(() => {
    console.error("Caught by error.tsx:", error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-red-500 p-6 text-black selection:bg-black selection:text-red-500">
      {/* Massive Brutalist Error Card */}
      <div className="flex w-full max-w-3xl flex-col items-center rounded-3xl border-8 border-black bg-white p-8 text-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:p-16">
        {/* Warning Icon Container */}
        <div className="mb-8 inline-flex items-center justify-center rounded-full border-8 border-black bg-yellow-400 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <AlertOctagon size={64} className="text-black" />
        </div>

        <div className="mb-4 inline-block border-4 border-black bg-black px-4 py-2 font-black tracking-widest text-red-500 uppercase">
          System Error
        </div>

        <h1 className="mb-6 text-5xl leading-tight font-black uppercase md:text-7xl">
          Something <br /> Broke.
        </h1>

        <p className="mb-12 max-w-lg text-xl font-bold text-neutral-600">
          We encountered an unexpected error while trying to load this page.
          Don't worry, the party isn't over.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col flex-wrap items-center justify-center gap-6 md:flex-row">
          <button
            onClick={() => reset()} // Attempts to recover by trying to re-render the segment
            className="flex w-full items-center justify-center gap-3 border-4 border-black bg-black px-8 py-5 text-xl font-black text-white uppercase shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] transition-all hover:-translate-y-1 hover:bg-red-500 hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none md:w-auto"
          >
            <RotateCcw size={24} />
            Try Again
          </button>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-3 border-4 border-black bg-white px-8 py-5 text-xl font-black text-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none md:w-auto"
          >
            <Home size={24} />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
