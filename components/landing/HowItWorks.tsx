import React from "react"
import StepCard from "./StepCard"
import { DraftingCompass, MonitorSmartphone, Smartphone } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="flex h-[90svh] w-full flex-col space-y-10 rounded-4xl border-4 border-black bg-white p-8 shadow-2xl dark:border-white dark:bg-black">
      <p className="text-4xl font-black">How It Works</p>
      <div className="flex h-full flex-col items-center gap-5 space-y-3 overflow-auto lg:flex-row lg:justify-center lg:overflow-visible">
        <StepCard
          icon={DraftingCompass}
          title="1. Create & Customize"
          subtitle="The Admin Setup."
          description="Launch your event in seconds. Give it a name, set your start time, and pin any VVIP speakers or notable guests to the top of the list. LinkParty generates a unique Event Code and a custom QR code for your venue."
          image=""
        />
        <StepCard
          icon={Smartphone}
          title="2. Join the Feed"
          subtitle="The Attendee Experience."
          description="Attendees scan the venue QR or enter the 6-digit code on their phones. No lengthy sign-ups—they just drop their LinkedIn URL or username. The guest list updates in real-time as names pop up on the directory."
          image=""
        />
        <StepCard
          icon={MonitorSmartphone}
          title="3. Take the Stage"
          subtitle="The Live Connection."
          description="Switch to Present Mode on the big screen. LinkParty cycles through attendee profiles, displaying a large, scannable QR code for each person. People in the crowd can simply point their cameras and 'connect' instantly without ever leaving their seats."
          image=""
        />
      </div>
    </div>
  )
}
