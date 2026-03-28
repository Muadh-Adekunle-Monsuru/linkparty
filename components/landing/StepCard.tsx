import { LucideIcon } from "lucide-react"
import React from "react"

export default function StepCard({
  title,
  description,
  subtitle,
  icon: Icon,
  bgColor,
}: {
  title: string
  description: string
  subtitle: string
  icon: LucideIcon
  bgColor: string
}) {
  return (
    <div
      className={`flex h-full flex-col border-4 border-black p-6 shadow-[8px_8px_0px_0px_${bgColor}] transition-transform hover:-translate-y-2 dark:border-white`}
    >
      <div className="mb-6 inline-flex w-max rounded-full border-4 border-black bg-white p-4 dark:border-white dark:bg-black">
        <Icon size={32} className="text-black dark:text-white" />
      </div>

      <h3 className="mb-2 text-2xl font-black text-black uppercase dark:text-white">
        {title}
      </h3>
      <p className="mb-4 font-bold tracking-wide text-black/70 uppercase dark:text-white/70">
        {subtitle}
      </p>
      <p className="leading-relaxed font-medium text-black dark:text-white">
        {description}
      </p>
    </div>
  )
}
