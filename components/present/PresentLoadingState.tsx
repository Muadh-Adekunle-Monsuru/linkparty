import { Loader } from "lucide-react"

export default function PresentLoadingState() {
  return (
    <div className="h-svh">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <Loader className="size-5 animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  )
}
