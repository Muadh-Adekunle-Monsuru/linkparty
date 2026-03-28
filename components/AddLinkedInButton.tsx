"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { InterestSelector } from "./InterestSelector"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function AddLinkFloatButton({ event_id }: { event_id: string }) {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [selections, setSelections] = useState([])
  const [isValid, setIsValid] = useState(false)
  const [isTouched, setIsTouched] = useState(false) // New state
  const [dialogChange, setDialogChange] = useState(false)
  const mutation = useMutation(api.functions.joinEvent)
  const [loading, setLoading] = useState(false)

  const handleBlur = (e: { target: { value: string } }) => {
    setIsTouched(true)
    setIsValid(isValidLinkedInLink(e.target.value))
  }

  const handleInterestSelection = (value: any) => {
    setSelections(value)
  }

  const handleSubmit = () => {
    setLoading(true)
    if (!name) {
      toast.error("Enter your name")
      return
    }

    if (!link || !isValid) {
      toast.error("Enter a valid LinkedIn link")
      return
    }

    mutation({ event_id, linkedin_url: link, name, interests: selections })
      .then(() => {
        toast.success("You have joined the party!")
        setName("")
        setLink("")
        setSelections([])
        setIsValid(false)
        setIsTouched(false)
        setDialogChange(false)
      })
      .catch((error) => {
        const isDuplicate = error.message?.includes("duplicate")

        if (isDuplicate) {
          toast.error(
            "You're already on the guest list! Each LinkedIn profile can only join once."
          )
        } else {
          // Fallback for other errors (validation, connection, etc.)
          toast.error(
            "Something went wrong. Please check your connection and try again."
          )
          console.error("LinkParty Join Error:", error)
        }
      })
    setLoading(false)
  }

  const isValidLinkedInLink = (url) => {
    // Regex Breakdown:
    // (in|company|profile|pub) -> LinkedIn uses various slugs
    // \/?                       -> Optional trailing slash
    // (\?.*)?                   -> Allows for '?' followed by any characters (UTM params)
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|profile|pub)\/[\w-]+\/?(\?.*)?$/

    return linkedInRegex.test(url.trim())
  }
  const normalizeLinkedInLink = (url) => {
    if (!url) return ""
    let cleaned = url.trim()

    // 1. Strip query parameters (everything from '?' onwards)
    if (cleaned.includes("?")) {
      cleaned = cleaned.split("?")[0]
    }

    // 2. Add protocol if missing
    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = `https://${cleaned}`
    }

    // 3. Ensure www. is present for stability
    if (
      cleaned.includes("linkedin.com") &&
      !cleaned.includes("www.linkedin.com")
    ) {
      cleaned = cleaned.replace("linkedin.com", "www.linkedin.com")
    }

    return cleaned
  }
  return (
    <Dialog open={dialogChange} onOpenChange={setDialogChange}>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer border border-black bg-black p-6 transition hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
            <Plus size={20} />
            <p>Join the Party</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="border-4 border-black sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase">
              Your profile
            </DialogTitle>
            <DialogDescription className="text-xl">
              Tell us about yourself
            </DialogDescription>
          </DialogHeader>
          <div>
            <label className="mb-2 block text-lg font-bold">Your Name*</label>
            <input
              type="text"
              value={name}
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Davies"
              className="w-full rounded-4xl border-2 border-black p-2 px-4 text-lg transition focus:outline-4"
            />
          </div>
          <div>
            <label className="mb-2 block text-lg font-bold">
              LinkedIn Profile URL*
            </label>
            <input
              type="text"
              value={link}
              name="link"
              id="link"
              onChange={(e) => {
                setLink(e.target.value)
                if (isTouched) setIsValid(isValidLinkedInLink(e.target.value))
              }}
              onBlur={(e) => {
                setIsTouched(true)
                const rawValue = e.target.value.trim()

                // 1. If it's empty, just reset the error state and stop.
                if (!rawValue) {
                  setIsValid(false)
                  return
                }

                // 2. Only normalize if it actually looks like a link
                // (contains 'linkedin' or at least some characters)
                if (rawValue.length > 5) {
                  const formattedLink = normalizeLinkedInLink(rawValue)
                  setLink(formattedLink)

                  // 3. Validate the *formatted* version
                  setIsValid(isValidLinkedInLink(formattedLink))
                } else {
                  // If it's too short to be a link, it's just invalid
                  setIsValid(false)
                }
              }}
              required
              placeholder="https://www.linkedin.com/in/your-profile"
              className={`w-full rounded-4xl border-2 p-2 px-4 text-lg transition focus:outline-4 ${
                isTouched
                  ? isValid
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-black"
              }`}
            />

            {isTouched &&
              (isValid ? (
                <p className="text-sm font-medium text-green-600">
                  Valid profile link.
                </p>
              ) : (
                <p className="text-sm font-medium text-red-600">
                  ⚠️ Please enter a valid LinkedIn URL.
                </p>
              ))}
          </div>
          <InterestSelector onSelectionChange={handleInterestSelection} />
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="cursor-pointer border border-black bg-black p-6 transition hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              disabled={!isValid || loading}
            >
              {loading ? "Joining" : "Join the Party"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
