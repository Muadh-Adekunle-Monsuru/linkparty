"use client"
import Link from "next/link"
import { Smartphone, Laptop, ArrowLeft, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function HowToFindLink() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col bg-yellow-400 text-black selection:bg-black selection:text-yellow-400">
      {/* Top Navigation */}
      <div className="w-full border-b-8 border-black bg-white px-6 py-4 md:px-12 md:py-6">
        <div
          onClick={() => {
            router.back()
          }}
          className="group inline-flex cursor-pointer items-center gap-3 text-xl font-black tracking-widest uppercase transition-colors hover:text-neutral-500"
        >
          <ArrowLeft
            size={24}
            className="transition-transform group-hover:-translate-x-2"
          />
          Back to Join
        </div>
      </div>

      {/* Main Content Area */}
      <section className="flex flex-grow flex-col items-center p-6 md:p-12">
        <div className="w-full max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl leading-[1.1] font-black uppercase md:text-7xl">
              Grab Your <br /> LinkedIn Link
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-bold text-black/80">
              Need to add your profile to the directory? Here is exactly how to
              find your unique URL on any device.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {/* Mobile Instructions Card */}
            <div className="flex h-full flex-col rounded-3xl border-8 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] lg:p-12">
              <div className="mb-8 inline-flex w-max rounded-2xl border-4 border-black bg-pink-300 p-4">
                <Smartphone size={40} className="text-black" />
              </div>

              <h2 className="mb-8 text-4xl font-black uppercase">
                On Mobile app
              </h2>

              <ol className="flex flex-col gap-6 text-lg font-bold">
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    1
                  </span>
                  <p>
                    Open the LinkedIn app and tap your{" "}
                    <strong>Profile Picture</strong> in the top left corner.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    2
                  </span>
                  <p>
                    Tap your name or <strong>View Profile</strong>.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    3
                  </span>
                  <p>
                    Tap the <strong>three dots (...)</strong> located right next
                    to the "Add Section" button.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    4
                  </span>
                  <p>
                    Scroll down to "Contact Info" and tap{" "}
                    <strong>Copy your profile link</strong>.
                  </p>
                </li>
              </ol>
            </div>

            {/* Laptop/Desktop Instructions Card */}
            <div className="flex h-full flex-col rounded-3xl border-8 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] lg:p-12">
              <div className="mb-8 inline-flex w-max rounded-2xl border-4 border-black bg-cyan-300 p-4">
                <Laptop size={40} className="text-black" />
              </div>

              <h2 className="mb-8 text-4xl font-black uppercase">
                On a Laptop
              </h2>

              <ol className="flex flex-col gap-6 text-lg font-bold">
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    1
                  </span>
                  <p>Go to LinkedIn.com and log into your account.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    2
                  </span>
                  <p>
                    Click on your <strong>Profile Picture (Me)</strong> icon at
                    the top right of the navigation bar.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    3
                  </span>
                  <p>
                    Click the <strong>View Profile</strong> button from the
                    dropdown menu.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-white">
                    4
                  </span>
                  <p>
                    Click into the address bar at the top of your browser and{" "}
                    <strong>Copy the URL</strong> (it should look like{" "}
                    <i>linkedin.com/in/your-name</i>).
                  </p>
                </li>
              </ol>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 flex w-full items-center justify-center gap-3 border-4 border-black bg-black px-6 py-4 text-lg font-black text-white uppercase transition-all hover:-translate-y-1 hover:bg-yellow-400 hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
              >
                Open LinkedIn
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
