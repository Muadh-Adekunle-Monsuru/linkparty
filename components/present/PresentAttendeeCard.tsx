import type { Doc } from "@/convex/_generated/dataModel"
import { LinkIcon } from "lucide-react"
import Image from "next/image"

type PresentAttendeeCardProps = {
  attendee: Doc<"attendess">
  qrCode: string | null
}

export default function PresentAttendeeCard({
  attendee,
  qrCode,
}: PresentAttendeeCardProps) {
  return (
    <div className="mb-12 flex flex-col items-stretch overflow-hidden rounded-3xl border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:flex-row">
      <div className="flex flex-1 flex-col justify-center border-b-8 border-black p-8 lg:border-r-8 lg:border-b-0 lg:p-16">
        <div className="mb-6 inline-block w-max bg-black px-4 py-2 text-sm font-black tracking-widest text-yellow-400 uppercase">
          Featured Attendee
        </div>

        <h1 className="mb-8 line-clamp-2 text-6xl leading-[1.1] font-black break-words uppercase md:text-7xl lg:text-8xl">
          {attendee.name}
        </h1>

        {attendee.interests && attendee.interests.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            {attendee.interests.map((interest) => (
              <span
                key={interest}
                className="border-4 border-black bg-yellow-400 px-4 py-2 text-xl font-bold text-black uppercase"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {attendee.linkedin_url && (
          <a
            href={attendee.linkedin_url}
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

      {qrCode && (
        <div className="flex flex-col items-center justify-center bg-neutral-50 p-12 lg:w-[450px]">
          <h2 className="mb-6 text-center text-4xl font-black tracking-widest text-black uppercase">
            Scan to <br /> Connect
          </h2>
          <div className="rounded-2xl border-8 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-2">
            <div className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px]">
              <Image
                src={qrCode}
                alt={`QR Code for ${attendee.name}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
