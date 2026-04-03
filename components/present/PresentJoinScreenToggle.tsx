"use client"

type PresentJoinScreenToggleProps = {
  onSelectJoin: () => void
  onSelectSlides: () => void
  mode: "join" | "slides"
}

export default function PresentJoinScreenToggle({
  onSelectJoin,
  onSelectSlides,
  mode,
}: PresentJoinScreenToggleProps) {
  return (
    <div
      className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 rounded-2xl border-4 border-black bg-white p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:right-6 sm:bottom-6 sm:flex-row"
      role="group"
      aria-label="Presentation mode"
    >
      <button
        type="button"
        onClick={onSelectJoin}
        className={`rounded-xl px-4 py-3 text-sm font-black uppercase transition-colors sm:px-5 sm:text-base ${
          mode === "join"
            ? "bg-black text-yellow-400"
            : "bg-white text-black hover:bg-neutral-100"
        }`}
      >
        Join screen
      </button>
      <button
        type="button"
        onClick={onSelectSlides}
        className={`rounded-xl px-4 py-3 text-sm font-black uppercase transition-colors sm:px-5 sm:text-base ${
          mode === "slides"
            ? "bg-black text-yellow-400"
            : "bg-white text-black hover:bg-neutral-100"
        }`}
      >
        Attendee slides
      </button>
    </div>
  )
}
