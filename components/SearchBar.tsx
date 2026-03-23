"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"

export default function SearchBar({ onSearch }: any) {
  const [query, setQuery] = useState("")

  const handleChange = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-md">

      {/* Search Icon */}
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
  type="text"
  value={query}
  onChange={(e) => handleChange(e.target.value)}
  placeholder="Search thoughts..."
  className="
    w-full 
    sm:max-w-md 
    md:max-w-lg 
    lg:max-w-2xl
    pl-10 pr-10 py-3
    rounded-xl bg-white
    text-sm text-gray-900
    outline-none focus:outline-none
    focus:ring-2 focus:ring-blue-500
    transition
  "
/>


      {/* Clear Button */}
      {query && (
        <X
          size={16}
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
        />
      )}
    </div>
  )
}
