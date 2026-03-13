import { LucideIcon } from "lucide-react"
import React from "react"

export default function StepCard({
  title,
  description,
  image,
  subtitle,
  icon: Icon,
}: {
  title: string
  description: string
  image: string
  subtitle: string
  icon: LucideIcon
}) {
  return (
    <div className="h-full w-full max-w-lg space-y-3 rounded-4xl border-4 border-black p-5 dark:border-neutral-400">
      <Icon size={150} strokeWidth={0.4} className="my-10" />
      <p className="text-4xl font-bold">{title}</p>
      <p className="text-2xl font-medium">{subtitle}</p>
      <p className="text-justify text-xl">{description}</p>
    </div>
  )
}
