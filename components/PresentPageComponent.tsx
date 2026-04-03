import { api } from "@/convex/_generated/api"
import PresentAttendeeCard from "@/components/present/PresentAttendeeCard"
import PresentEmptyState from "@/components/present/PresentEmptyState"
import PresentLoadingState from "@/components/present/PresentLoadingState"
import PresentSlideNavigation from "@/components/present/PresentSlideNavigation"
import PresentJoinScreenToggle from "@/components/present/PresentJoinScreenToggle"
import PresentTopBanner from "@/components/present/PresentTopBanner"
import ErrorComponent from "@/components/event/ErrorComponent"
import type { Doc } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import React, { useEffect, useState } from "react"

function isAttendeeDoc(v: unknown): v is Doc<"attendess"> {
  return typeof v === "object" && v !== null && "_id" in v
}

export default function PresentPageComponent({
  event_id,
}: {
  event_id: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [qrCode, setQrCode] = useState<string | null>(null)
  /** When true and there are attendees, keep showing the join QR screen instead of the carousel. */
  const [preferJoinScreen, setPreferJoinScreen] = useState(false)

  const eventData = useQuery(api.functions.getEventDetails, {
    event_id,
  })
  const attendees = useQuery(api.functions.getEventAttendees, { event_id })

  const rawSlide = Array.isArray(attendees) ? attendees[currentIndex] : undefined
  const resolvedAttendee = isAttendeeDoc(rawSlide) ? rawSlide : undefined

  useEffect(() => {
    if (!resolvedAttendee) return

    const generateQRCode = async () => {
      try {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
          resolvedAttendee.linkedin_url
        )}`
        setQrCode(qrUrl)
      } catch (err) {
        console.error("Error generating QR code:", err)
      }
    }

    generateQRCode()
  }, [resolvedAttendee])

  useEffect(() => {
    if (
      !isAutoPlay ||
      !Array.isArray(attendees) ||
      attendees.length === 0 ||
      preferJoinScreen
    )
      return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % attendees.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, attendees, preferJoinScreen])

  useEffect(() => {
    if (!Array.isArray(attendees)) return
    if (attendees.length === 0) {
      setCurrentIndex(0)
      return
    }
    setCurrentIndex((i) => Math.min(i, attendees.length - 1))
  }, [attendees])

  if (eventData == undefined || attendees == undefined) {
    return <PresentLoadingState />
  }

  if (eventData == "error" || attendees == "error") {
    return <ErrorComponent />
  }

  const hasAttendees = attendees.length > 0
  const showJoinScreenOnly = !hasAttendees || preferJoinScreen

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + attendees.length) % attendees.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % attendees.length)
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://linkparty.vercel.app"
  const targetUrl = `${baseUrl}/event/${eventData._id}`
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(targetUrl)}`

  if (showJoinScreenOnly) {
    return (
      <>
        {hasAttendees && (
          <PresentJoinScreenToggle
            mode="join"
            onSelectJoin={() => setPreferJoinScreen(true)}
            onSelectSlides={() => setPreferJoinScreen(false)}
          />
        )}
        <PresentEmptyState eventCode={eventData.code} qrCodeSrc={qrCodeSrc} />
      </>
    )
  }

  if (!resolvedAttendee) {
    return <PresentLoadingState />
  }

  return (
    <>
      {hasAttendees && (
        <PresentJoinScreenToggle
          mode="slides"
          onSelectJoin={() => setPreferJoinScreen(true)}
          onSelectSlides={() => setPreferJoinScreen(false)}
        />
      )}
      <main className="flex min-h-screen flex-col bg-yellow-400 text-black selection:bg-black selection:text-yellow-400">
        <PresentTopBanner eventCode={eventData.code} />

        <section className="flex flex-grow flex-col items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-7xl">
            <PresentAttendeeCard attendee={resolvedAttendee} qrCode={qrCode} />

            <PresentSlideNavigation
              slideCount={attendees.length}
              currentIndex={currentIndex}
              isAutoPlay={isAutoPlay}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSelectSlide={(index) => {
                setCurrentIndex(index)
                setIsAutoPlay(false)
              }}
              onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
            />
          </div>
        </section>
      </main>
    </>
  )
}
