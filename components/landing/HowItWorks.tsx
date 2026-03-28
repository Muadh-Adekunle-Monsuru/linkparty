import React from "react"
import StepCard from "./StepCard"
import { DraftingCompass, MonitorSmartphone, Smartphone } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col space-y-12 rounded-3xl border-8 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] lg:p-16 dark:border-white dark:bg-black dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
      <div className="text-center">
        <h2 className="text-5xl font-black uppercase md:text-6xl">
          How It Works
        </h2>
        <div className="mx-auto mt-4 h-2 w-24 bg-yellow-300"></div>
      </div>

      {/* Grid layout instead of flex keeps the heights perfectly equal */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
        <StepCard
          icon={DraftingCompass}
          title="1. Create"
          subtitle="The Admin Setup."
          description="Launch your event in seconds. Give it a name, set your date and location, and upload your flier. LinkParty generates a unique Event Code and a custom QR code for your venue."
          bgColor="bg-pink-300" // Added background color prop!
        />

        <StepCard
          icon={Smartphone}
          title="2. Join"
          subtitle="The Attendee Experience."
          description="Attendees scan the QR or enter the 6-digit code. No lengthy sign-ups—they just drop their LinkedIn URL. The guest list updates in real-time on the directory. And Admin can pin any VVIP speakers"
          bgColor="bg-yellow-300"
        />

        <StepCard
          icon={MonitorSmartphone}
          title="3. Connect"
          subtitle="The Live Connection."
          description="Switch to Present Mode on the big screen. LinkParty cycles through profiles, displaying a large QR code. People can point their cameras and connect without leaving their seats."
          bgColor="bg-cyan-300"
        />
      </div>
    </div>
  )
}
