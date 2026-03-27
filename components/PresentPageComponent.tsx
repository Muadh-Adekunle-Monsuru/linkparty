import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import React, { useEffect, useState } from "react"
import { Spinner } from "./ui/spinner"
import ErrorComponent from "./event/ErrorComponent"
import {
  ChevronLeft,
  ChevronRight,
  LinkIcon,
  Loader,
  Pause,
  Play,
  QrCode,
  Smartphone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PresentPageComponent({
  event_id,
}: {
  event_id: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const eventData = useQuery(api.functions.getEventDetails, {
    event_id,
  })
  const attendees = useQuery(api.functions.getEventAttendees, { event_id })

  const currentAttendee = attendees?.[currentIndex]

  useEffect(() => {
    if (typeof currentAttendee == "string") return
    if (!currentAttendee?._id) return

    const generateQRCode = async () => {
      try {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
          currentAttendee.linkedin_url
        )}`
        setQrCode(qrUrl)
      } catch (err) {
        console.error("Error generating QR code:", err)
      }
    }

    generateQRCode()
  }, [currentAttendee])

  useEffect(() => {
    if (!isAutoPlay || !attendees?.length) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % attendees.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, attendees?.length])

  if (eventData == undefined || attendees == undefined)
    return (
      <div className="h-svh">
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <Loader className="size-5 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    )

  if (
    eventData == "error" ||
    attendees == "error" ||
    typeof currentAttendee == "string"
  )
    return <ErrorComponent />

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + attendees.length) % attendees.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % attendees.length)
  }

  if (attendees.length === 0 || currentAttendee == undefined) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-yellow-400 p-4 md:p-12">
        <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:flex-row">
          {/* Left Side: Instructions & Text CTAs */}
          <div className="flex flex-1 flex-col justify-center border-b-8 border-black p-8 lg:border-r-8 lg:border-b-0 lg:p-16">
            <div className="mb-4 inline-block w-max border-4 border-black bg-black px-4 py-2 text-xl font-black tracking-widest text-white uppercase">
              Live Event
            </div>

            <h1 className="mb-6 text-6xl leading-[1.1] font-black text-black uppercase md:text-7xl lg:text-8xl">
              Join The <br /> Party
            </h1>

            <p className="mb-12 max-w-xl text-2xl leading-relaxed font-bold text-neutral-600">
              Scan the QR Code to join the directory and share your LinkedIn
              profile on the big screen!
            </p>

            {/* Alternative Join Methods */}
            <div className="flex flex-col gap-8 border-t-4 border-dashed border-neutral-300 pt-12">
              {/* Step 1: URL */}
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-blue-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <LinkIcon size={32} className="text-black" />
                </div>
                <div>
                  <p className="text-xl font-bold text-neutral-500 uppercase">
                    1. Go to website
                  </p>
                  <p className="text-3xl font-black text-black sm:text-4xl">
                    link-party.com
                  </p>
                </div>
              </div>

              {/* Step 2: Code */}
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-pink-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Smartphone size={32} className="text-black" />
                </div>
                <div>
                  <p className="text-xl font-bold text-neutral-500 uppercase">
                    2. Enter Code
                  </p>
                  <p className="text-5xl font-black tracking-[0.2em] text-black uppercase sm:text-6xl">
                    {eventData.code}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: QR Code Area */}
          <div className="flex flex-col items-center justify-center bg-neutral-100 p-8 lg:w-[45%] lg:p-16">
            <div className="mb-8 flex flex-col items-center text-center">
              <QrCode size={48} className="mb-4 text-black" />
              <h2 className="text-4xl font-black tracking-widest text-black uppercase md:text-5xl">
                Scan Me
              </h2>
              <p className="mt-2 text-2xl font-bold text-neutral-500">
                Point your camera here
              </p>
            </div>

            <div className="rounded-3xl border-8 border-black bg-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-2">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
                  eventData._id
                )}`}
                alt="Event QR Code"
                width={500}
                height={500}
                className="h-auto w-full max-w-[300px] lg:max-w-[450px]"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-yellow-400 text-black selection:bg-black selection:text-yellow-400">
      {/* Top Instruction Banner */}
      <div className="w-full border-b-8 border-black bg-black px-4 py-4 text-center md:py-6">
        <h2 className="text-xl font-black tracking-widest text-yellow-400 uppercase md:text-2xl lg:text-3xl">
          ⚡Visit link-party.com and enter code: {eventData.code} to join⚡
        </h2>
      </div>

      {/* Main Presentation Area */}
      <section className="flex flex-grow flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-7xl">
          {/* Main Attendee Card */}
          <div className="mb-12 flex flex-col items-stretch overflow-hidden rounded-3xl border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:flex-row">
            {/* Left side - Attendee Info */}
            <div className="flex flex-1 flex-col justify-center border-b-8 border-black p-8 lg:border-r-8 lg:border-b-0 lg:p-16">
              <div className="mb-6 inline-block w-max bg-black px-4 py-2 text-sm font-black tracking-widest text-yellow-400 uppercase">
                Featured Attendee
              </div>

              <h1 className="mb-8 text-6xl leading-[1.1] font-black break-words uppercase md:text-7xl lg:text-8xl">
                {currentAttendee.name}
              </h1>

              {/* Interests Tags */}
              {currentAttendee.interests &&
                currentAttendee.interests.length > 0 && (
                  <div className="mb-12 flex flex-wrap gap-3">
                    {currentAttendee.interests.map((interest) => (
                      <span
                        key={interest}
                        className="border-4 border-black bg-yellow-400 px-4 py-2 text-xl font-bold text-black uppercase"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}

              {currentAttendee.linkedin_url && (
                <a
                  href={currentAttendee.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-max items-center gap-3 border-4 border-black bg-black px-8 py-4 text-xl font-black text-white transition-colors hover:bg-yellow-400 hover:text-black"
                >
                  <LinkIcon
                    size={24}
                    className="transition-transform group-hover:rotate-12"
                  />
                  CONNECT ON LINKEDIN
                </a>
              )}
            </div>

            {/* Right side - QR Code Area */}
            {qrCode && (
              <div className="flex flex-col items-center justify-center bg-neutral-50 p-12 lg:w-[450px]">
                <h2 className="mb-6 text-center text-4xl font-black tracking-widest text-black uppercase">
                  Scan to <br /> Connect
                </h2>
                <div className="rounded-2xl border-8 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-2">
                  <div className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px]">
                    <Image
                      src={qrCode}
                      alt={`QR Code for ${currentAttendee.name}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
            <button
              onClick={handlePrevious}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-yellow-400 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none md:h-20 md:w-max md:px-8"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={32} />
              <span className="hidden text-2xl font-black uppercase md:block">
                Prev
              </span>
            </button>

            {/* Center Controls: Dots + Play/Pause Toggle */}
            <div className="flex flex-col items-center gap-6">
              {/* Pagination Dots */}
              <div className="flex flex-wrap justify-center gap-3 px-4">
                {attendees.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlay(false)
                    }}
                    className={`h-4 rounded-full border-2 border-black transition-all ${
                      index === currentIndex
                        ? "w-12 bg-black"
                        : "w-4 bg-white hover:bg-black"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Play/Pause Button moved here */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center gap-2 rounded-full border-4 border-black bg-black px-6 py-2 font-black text-white uppercase transition-all hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
                {isAutoPlay ? "Pause Autoplay" : "Start Autoplay"}
              </button>
            </div>

            <button
              onClick={handleNext}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-yellow-400 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none md:h-20 md:w-max md:px-8"
              aria-label="Next Slide"
            >
              <span className="hidden text-2xl font-black uppercase md:block">
                Next
              </span>
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
