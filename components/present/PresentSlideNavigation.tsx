import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

type PresentSlideNavigationProps = {
  slideCount: number
  currentIndex: number
  isAutoPlay: boolean
  onPrevious: () => void
  onNext: () => void
  onSelectSlide: (index: number) => void
  onToggleAutoPlay: () => void
}

export default function PresentSlideNavigation({
  slideCount,
  currentIndex,
  isAutoPlay,
  onPrevious,
  onNext,
  onSelectSlide,
  onToggleAutoPlay,
}: PresentSlideNavigationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
      <button
        type="button"
        onClick={onPrevious}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-yellow-400 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none md:h-20 md:w-max md:px-8"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
        <span className="hidden text-2xl font-black uppercase md:block">
          Prev
        </span>
      </button>

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelectSlide(index)}
              className={`h-4 rounded-full border-2 border-black transition-all ${
                index === currentIndex
                  ? "w-12 bg-black"
                  : "w-4 bg-white hover:bg-black"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onToggleAutoPlay}
          className="flex items-center gap-2 rounded-full border-4 border-black bg-black px-6 py-2 font-black text-white uppercase transition-all hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
          {isAutoPlay ? "Pause Autoplay" : "Start Autoplay"}
        </button>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-yellow-400 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none md:h-20 md:w-max md:px-8"
        aria-label="Next Slide"
      >
        <span className="hidden text-2xl font-black uppercase md:block">
          Next
        </span>
        <ChevronRight size={32} />
      </button>
    </div>
  )
}
