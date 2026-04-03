type PresentTopBannerProps = {
  eventCode: string
}

export default function PresentTopBanner({ eventCode }: PresentTopBannerProps) {
  return (
    <div className="w-full border-b-8 border-black bg-black px-4 py-4 text-center md:py-6">
      <h2 className="text-xl font-black tracking-widest text-yellow-400 uppercase md:text-2xl lg:text-3xl">
        ⚡Visit linkparty.vercel.app and enter code: {eventCode} to join⚡
      </h2>
    </div>
  )
}
