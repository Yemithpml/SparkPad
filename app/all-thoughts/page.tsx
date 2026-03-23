"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtCard from "@/components/ThoughtCard"
import SearchBar from "@/components/SearchBar"

type Thought = {
  id: number
  title: string
  description: string
  tag: string
  date: string
  favorite: boolean
}

export default function AllThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [search, setSearch] = useState("")
  const [loaded, setLoaded] = useState(false)

  // ✅ Load thoughts
  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")
    if (saved) setThoughts(JSON.parse(saved))
    setLoaded(true)
  }, [])

  // ✅ Persist
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem("sparkpad-thoughts", JSON.stringify(thoughts))
  }, [thoughts, loaded])

  // ⭐ Toggle favorite
  const toggleFavorite = (id: number) => {
    setThoughts(prev =>
      prev.map(t =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    )
  }

  // 🗑️ Delete
  const deleteThought = (id: number) => {
    setThoughts(prev => prev.filter(t => t.id !== id))
  }

  // ✏️ Edit
  const editThought = (id: number, updated: Partial<Thought>) => {
    setThoughts(prev =>
      prev.map(t =>
        t.id === id ? { ...t, ...updated } : t
      )
    )
  }

  // 🔍 SEARCH FILTER
  const filteredThoughts = thoughts.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  )

  if (!loaded) return null

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen md:ml-64">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            All Thoughts
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Browse and search through all your thoughts
          </p>
        </div>

        {/* 🔍 Search */}
        <div className="mb-6">
          <SearchBar onSearch={setSearch} />
        </div>

        {/* 📊 Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredThoughts.length} of {thoughts.length} thoughts
        </p>

        {/* 🧠 Thoughts Grid */}
        {filteredThoughts.length === 0 ? (
          <p className="text-gray-400 text-sm mt-10">
            No thoughts found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredThoughts.map(t => (
              <ThoughtCard
                key={t.id}
                id={t.id}
                title={t.title}
                description={t.description}
                tag={t.tag}
                date={t.date}
                favorite={t.favorite}
                toggleFavorite={toggleFavorite}
                deleteThought={deleteThought}
                editThought={editThought}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  )
}
