"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtCard from "@/components/ThoughtCard"

type Thought = {
  id: number
  title: string
  description: string
  tag: string
  date: string
  favorite: boolean
}

const TAGS = ["Idea", "Thoughts", "Personal", "Learning", "Business", "Random"]

// 🎨 Tag button colors
const tagButtonStyles: Record<string, string> = {
  Idea: "bg-blue-100 text-blue-700 border-blue-200",
  Thoughts: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Personal: "bg-pink-100 text-pink-700 border-pink-200",
  Learning: "bg-green-100 text-green-700 border-green-200",
  Business: "bg-purple-100 text-purple-700 border-purple-200",
  Random: "bg-orange-200 text-orange-700 border-orange-300"
}

export default function TagsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [filter, setFilter] = useState<string | "All">("All")
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")
    if (saved) setThoughts(JSON.parse(saved))
    setLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem("sparkpad-thoughts", JSON.stringify(thoughts))
  }, [thoughts, loaded])

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setThoughts(prev =>
      prev.map(t =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    )
  }

  // Filter logic
  const displayedThoughts =
    filter === "All"
      ? thoughts
      : thoughts.filter(t => t.tag === filter)

  // Count per tag
  const getCount = (tag: string) =>
    thoughts.filter(t => t.tag === tag).length

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen md:ml-64">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Tags
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          Organize your thoughts by category
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">

          {/* All */}
          <button
            onClick={() => setFilter("All")}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
              ${
                filter === "All"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            All ({thoughts.length})
          </button>

          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`
                px-4 py-2 rounded-2xl text-sm font-medium border transition-all duration-200
                ${
                  filter === tag
                    ? tagButtonStyles[tag]
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {tag} ({getCount(tag)})
            </button>
          ))}

        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {displayedThoughts.map(t => (
            <ThoughtCard
              key={t.id}
              id={t.id}
              title={t.title}
              description={t.description}
              tag={t.tag}
              date={t.date}
              favorite={t.favorite}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

      </main>
    </div>
  )
}
