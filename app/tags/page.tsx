"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtCard from "@/components/ThoughtCard"
import { Calendar } from "lucide-react"

type Thought = {
  id: number
  title: string
  description: string
  tag: string
  date: string
  favorite: boolean
}

const TAGS = ["Idea", "Coding", "Personal", "Learning", "Business"]

export default function TagsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [filter, setFilter] = useState<string | "All">("All")
  const [loaded, setLoaded] = useState(false)

  // Load thoughts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")
    if (saved) setThoughts(JSON.parse(saved))
    setLoaded(true)
  }, [])

  // Persist thoughts
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem("sparkpad-thoughts", JSON.stringify(thoughts))
  }, [thoughts, loaded])

  const toggleFavorite = (id: number) => {
    setThoughts(prev =>
      prev.map(t => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    )
  }

  // Filtered thoughts
  const displayedThoughts =
    filter === "All"
      ? thoughts
      : thoughts.filter(t => t.tag === filter)

  // Count for each tag
  const getCount = (tag: string) =>
    thoughts.filter(t => t.tag === tag).length

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen md:ml-64">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Tags
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          Organize your thoughts by category
        </p>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-2 rounded-2xl font-medium ${
              filter === "All"
                ? "bg-blue-400 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All ({thoughts.length})
          </button>

          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1 rounded-full font-medium ${
                filter === tag
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tag} ({getCount(tag)})
            </button>
          ))}
        </div>

        {/* Thought Cards */}
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
              // Optionally add delete/edit functions if needed
            />
          ))}
        </div>
      </main>
    </div>
  )
}
