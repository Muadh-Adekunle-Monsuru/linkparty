import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
export default function AdminEventListSkeleton() {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-xl border-2 border-neutral-200 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left side: Title and Badges */}
            <div className="flex-grow">
              {/* Title Skeleton */}
              <Skeleton className="mb-3 h-8 w-3/4 md:w-64" />

              {/* Badges Skeleton */}
              <div className="mb-4 flex flex-wrap gap-4">
                <Skeleton className="h-9 w-32 rounded-none" /> {/* Code tag */}
                <Skeleton className="h-9 w-24 rounded-none" />{" "}
                {/* Status tag */}
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-11 w-28 rounded-none" /> {/* COPY */}
              <Skeleton className="h-11 w-28 rounded-none" /> {/* VIEW */}
              <Skeleton className="h-11 w-32 rounded-none" /> {/* PRESENT */}
              {/* Icon-only button skeletons */}
              <Skeleton className="h-11 w-14 rounded-none" />{" "}
              {/* Lock/Unlock */}
              <Skeleton className="h-11 w-14 rounded-none" /> {/* Eye/Hide */}
              <Skeleton className="h-11 w-14 rounded-none" /> {/* Trash */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
