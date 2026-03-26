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

  const handleBlur = (e: { target: { value: string } }) => {
    setIsTouched(true)
    setIsValid(isValidLinkedInLink(e.target.value))
  }

  const handleInterestSelection = (value: any) => {
    setSelections(value)
  }

  const handleSubmit = () => {
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
      .catch(() => {
        toast.success("Error joining event")
      })
  }

  const isValidLinkedInLink = (url: string) => {
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/

    return linkedInRegex.test(url.trim())
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
              onBlur={handleBlur}
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
            >
              <p>Join the Party</p>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
