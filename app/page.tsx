"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtInput from "@/components/ThoughtInput"
import ThoughtCard from "@/components/ThoughtCard"

export default function Home() {

  const [thoughts, setThoughts] = useState<any[]>([])

  // Load thoughts from localStorage
  useEffect(() => {
    const savedThoughts = localStorage.getItem("sparkpad-thoughts")

    if (savedThoughts) {
      setThoughts(JSON.parse(savedThoughts))
    }
  }, [])

  // Save thoughts whenever they change
  useEffect(() => {
    localStorage.setItem(
      "sparkpad-thoughts",
      JSON.stringify(thoughts)
    )
  }, [thoughts])

  const addThought = (thought: any) => {
    setThoughts([
      {
        ...thought,
        id: Date.now(),
        favorite: false
      },
      ...thoughts
    ])
  }

  const toggleFavorite = (id: number) => {
    setThoughts(
      thoughts.map((t) =>
        t.id === id ? { ...t, favorite: !t.favorite } : t
      )
    )
  }

  const deleteThought = (id: number) => {
    setThoughts(thoughts.filter((t) => t.id !== id))
  }

  const editThought = (id: number, updated: any) => {
    setThoughts(
      thoughts.map((t) =>
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
