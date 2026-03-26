import { Search, X } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

// Define the expected props
interface BrutalistSearchBarProps {
  searchTerm: string
  // This exactly matches what React.useState returns for the setter
  setSearchTerm: Dispatch<SetStateAction<string>> | ((term: string) => void)
  placeholder?: string // Optional prop
}

export function BrutalistSearchBar({
  searchTerm,
  setSearchTerm,
  placeholder = "SEARCH BY NAME OR INTEREST...",
}: BrutalistSearchBarProps) {
  return (
    <div className="relative flex w-full max-w-lg items-center rounded-xl border-2 border-black bg-white transition-all focus-within:-translate-y-1 focus-within:bg-yellow-50 focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <Search size={20} className="absolute left-4 text-black" />

      <input
        type="text"
        value={searchTerm}
        // TypeScript now knows 'e' is an input change event
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        placeholder={placeholder}
        className="w-full bg-transparent py-4 pr-12 pl-12 font-bold text-black uppercase placeholder:font-medium placeholder:text-neutral-500 focus:outline-none"
      />

      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-3 rounded-full border-2 border-transparent p-1 transition-colors hover:border-black hover:bg-black hover:text-yellow-300"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
