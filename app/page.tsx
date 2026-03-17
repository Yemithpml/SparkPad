"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtInput from "@/components/ThoughtInput"
import ThoughtCard from "@/components/ThoughtCard"

type Thought = {
  id: number
  title: string
  description: string
  tag: string
  date: string
  favorite: boolean
}

export default function Home() {

  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load thoughts
  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")

    if (saved) {
      setThoughts(JSON.parse(saved))
    }

    setLoaded(true)
  }, [])

  // Persist thoughts
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(
      "sparkpad-thoughts",
      JSON.stringify(thoughts)
    )
  }, [thoughts, loaded])


  const addThought = (thought: any) => {

    if (!thought.title.trim()) return

    const newThought: Thought = {
      id: Date.now(),
      title: thought.title,
      description: thought.description,
      tag: thought.tag,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      favorite: false
    }

    setThoughts((prev) => [newThought, ...prev])
  }

  const toggleFavorite = (id: number) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    )
  }

  const deleteThought = (id: number) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id))
  }

  const editThought = (id: number, updated: Partial<Thought>) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      )
    )
  }

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
          <h1 className="text-2xl md:text-3xl text-gray-900 font-bold">
            Welcome back!
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            What's on your mind today?
          </p>
        </div>

        <ThoughtInput addThought={addThought} />

        <h2 className="font-semibold mb-4 text-gray-800 mt-10">
          Recent Thoughts
        </h2>

        <div
          className="
          grid gap-6
          sm:grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
        "
        >
          {thoughts.map((t) => (
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

      </main>

    </div>
  )
}
