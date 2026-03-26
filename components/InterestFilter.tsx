"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X, Check } from "lucide-react"

const INTEREST_OPTIONS = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Cybersecurity",
  "UI/UX Design",
  "Graphics Design",
  "Data Science",
  "DevOps",
  "Mobile Dev",
  "AI/Machine Learning",
  "Cloud Computing",
]

export function InterestFilter({
  onSelectionChange,
}: {
  onSelectionChange: (value: any) => any
}) {
  const [selected, setSelected] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const MAX_SELECTIONS = 10
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleSelection = (option) => {
    let newSelection
    if (selected.includes(option)) {
      // Remove if already selected
      newSelection = selected.filter((item) => item !== option)
    } else {
      // Add if under limit
      newSelection = [...selected, option.toLowerCase()]
    }

    setSelected(newSelection)
    // Pass the array up to your parent component or form
    if (onSelectionChange) onSelectionChange(newSelection)
  }

  const removeTag = (e, option) => {
    e.stopPropagation() // Prevent opening the dropdown when clicking the X
    toggleSelection(option)
  }

  return (
    <div className="relative w-full max-w-lg" ref={dropdownRef}>
      {/* Main Input/Trigger Area */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[60px] cursor-pointer rounded-xl border-2 border-black bg-white p-3 pr-12 transition-colors hover:bg-neutral-50"
      >
        <div className="flex flex-wrap gap-2">
          {selected.length === 0 && (
            <span className="mt-1 font-medium text-neutral-500">
              Filter by interests...
            </span>
          )}

          {selected.map((item, index) => (
            <span
              key={item + index}
              className="flex items-center gap-1 border-2 border-black bg-yellow-300 px-3 py-1 text-sm font-bold text-black uppercase"
            >
              {item}
              <button
                type="button"
                onClick={(e) => removeTag(e, item)}
                className="ml-1 rounded-full p-0.5 transition-colors hover:bg-black hover:text-yellow-300"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        {/* Dropdown Arrow */}
        <div className="absolute top-[23px] right-4 text-black">
          <ChevronDown
            size={24}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {INTEREST_OPTIONS.map((option) => {
            const isSelected = selected.includes(option)
            const isMaxReached =
              selected.length >= MAX_SELECTIONS && !isSelected

            return (
              <div
                key={option}
                onClick={() => !isMaxReached && toggleSelection(option)}
                className={`flex cursor-pointer items-center justify-between border-b-2 border-neutral-100 p-4 transition-colors last:border-b-0 ${
                  isSelected
                    ? "bg-black text-white"
                    : isMaxReached
                      ? "cursor-not-allowed text-neutral-400"
                      : "font-medium text-black hover:bg-neutral-100"
                }`}
              >
                <span>{option}</span>
                {isSelected && <Check size={18} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
