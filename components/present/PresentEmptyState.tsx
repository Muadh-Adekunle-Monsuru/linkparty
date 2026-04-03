import { LinkIcon, QrCode, Smartphone } from "lucide-react"
import Image from "next/image"

type PresentEmptyStateProps = {
  eventCode: string
  qrCodeSrc: string
}

export default function PresentEmptyState({
  eventCode,
  qrCodeSrc,
}: PresentEmptyStateProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-yellow-400 p-4 md:p-12">
      <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] lg:flex-row">
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

          <div className="flex flex-col gap-8 border-t-4 border-dashed border-neutral-300 pt-12">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-blue-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <LinkIcon size={32} className="text-black" />
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-500 uppercase">
                  1. Go to website
                </p>
                <p className="text-3xl font-black text-black sm:text-4xl">
                  linkparty.vercel.app
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-pink-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Smartphone size={32} className="text-black" />
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-500 uppercase">
                  2. Enter Code
                </p>
                <p className="text-5xl font-black tracking-[0.2em] text-black uppercase sm:text-6xl">
                  {eventCode}
                </p>
              </div>
            </div>
          </div>
        </div>

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
              src={qrCodeSrc}
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
