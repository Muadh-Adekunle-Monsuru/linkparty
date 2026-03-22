import Image from "next/image"
import React from "react"

export default function AdminEventListEmptyState() {
  return (
    <div className="mb-12">
      <h2 className="font-Medium mb-6 text-2xl">Your Events</h2>

      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center transition-colors duration-300 hover:border-black">
        {/* Image with a slight grayscale effect that reveals on hover */}
        <div className="relative opacity-80 transition-opacity duration-300 hover:opacity-100">
          <Image
            src="/no-trips.png"
            height={200}
            width={300}
            alt="No events illustration"
            className="pointer-events-none drop-shadow-sm"
          />
        </div>

        <div className="max-w-md">
          <h3 className="mb-2 text-xl font-bold text-black uppercase">
            No Events Yet
          </h3>
          <p className="mb-8 text-neutral-600">
            Your dashboard is looking a little empty. Create your first event to
            start managing registrations and presentations.
          </p>
        </div>
      </div>
    </div>
  )
}
