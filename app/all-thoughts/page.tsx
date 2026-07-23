"use client"

import { useState } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtCard from "@/components/ThoughtCard"
import SearchBar from "@/components/SearchBar"
import { useThoughts } from "@/lib/ThoughtContext"

export default function AllThoughtsPage() {
  const { thoughts, loading, updateThought, deleteThought } = useThoughts()
  const [search, setSearch] = useState("")

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    const t = thoughts.find((t) => t.id === id)
    if (t) updateThought(id, { favorite: !t.favorite })
  }

  //  Edit
  const editThought = (id: number, updated: Partial<typeof thoughts[0]>) => {
    updateThought(id, updated)
  }

  //  SEARCH FILTER
  const filteredThoughts = thoughts.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return null

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

        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={setSearch} />
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredThoughts.length} of {thoughts.length} thoughts
        </p>

        {/* Thoughts Grid */}
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