import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/copyToClipboard.js

export const copyToClipboard = async (textToCopy: string) => {
  // 1. Modern approach for secure contexts (HTTPS/Localhost)
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(textToCopy)
      return true
    } catch (err) {
      console.error("Modern copy failed:", err)
    }
  }

  // 2. Legacy fallback for insecure contexts (HTTP) or older browsers
  try {
    const textArea = document.createElement("textarea")
    textArea.value = textToCopy

    // Move the textarea off-screen so the user doesn't see it
    // and to prevent the page from scrolling to the bottom
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"
    textArea.style.opacity = "0"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand("copy")
    document.body.removeChild(textArea)

    return successful
  } catch (err) {
    console.error("Fallback copy failed:", err)
    return false
  }
}
