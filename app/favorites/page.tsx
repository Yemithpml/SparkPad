"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtCard from "@/components/ThoughtCard"

export default function Favorites() {

  const [thoughts, setThoughts] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")

    if (saved) {
      setThoughts(JSON.parse(saved))
    }
  }, [])

  const toggleFavorite = (id: number) => {
    const updated = thoughts.map((t) =>
      t.id === id ? { ...t, favorite: !t.favorite } : t
    )

    setThoughts(updated)

    localStorage.setItem(
      "sparkpad-thoughts",
      JSON.stringify(updated)
    )
  }

  const deleteThought = (id: number) => {
    const updated = thoughts.filter((t) => t.id !== id)

    setThoughts(updated)

    localStorage.setItem(
      "sparkpad-thoughts",
      JSON.stringify(updated)
    )
  }

  const editThought = (id: number, updatedData: any) => {
    const updated = thoughts.map((t) =>
      t.id === id ? { ...t, ...updatedData } : t
    )

    setThoughts(updated)

    localStorage.setItem(
      "sparkpad-thoughts",
      JSON.stringify(updated)
    )
  }

  const favoriteThoughts = thoughts.filter((t) => t.favorite)

  return (
    <div className="flex">

      <Sidebar />

      <main
        className="
          flex-1 p-6 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen
          md:ml-64
        "
      >

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your Favorite Thoughts.
          </h1>

          <p className="text-gray-500">
            Your starred ideas and inspirations
          </p>
        </div>

        {favoriteThoughts.length === 0 ? (
          <p className="text-gray-400 mt-10">
            No favorite thoughts yet.
          </p>
        ) : (
          <div
            className="
            grid gap-6
            sm:grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
          "
          >
            {favoriteThoughts.map((t) => (
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
