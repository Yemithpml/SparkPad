"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
  const [limit, setLimit] = useState(6)
  const [isFirstVisit, setIsFirstVisit] = useState(false) 

  // ✅ Load thoughts + check first visit
  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")
    const visited = localStorage.getItem("sparkpad-visited")

    if (saved) {
      setThoughts(JSON.parse(saved))
    }

    if (!visited) {
      setIsFirstVisit(true)
      localStorage.setItem("sparkpad-visited", "true")
    }

    setLoaded(true)
  }, [])

  // ✅ Persist thoughts
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem("sparkpad-thoughts", JSON.stringify(thoughts))
  }, [thoughts, loaded])

  // ✅ Responsive limit
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLimit(2)
      } else {
        setLimit(6)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
      prev.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    )
  }

  const deleteThought = (id: number) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id))
  }

  const editThought = (id: number, updated: Partial<Thought>) => {
    setThoughts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-900 font-bold">
            {isFirstVisit ? "Welcome to SparkPad!" : "Welcome back!"}
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            {isFirstVisit
              ? "Your Second Brain. What's on your mind?"
              : "What's on your mind today?"}
          </p>
        </div>

        {/* Input */}
        <ThoughtInput addThought={addThought} />

        {/* Recent */}
        <div className="flex items-center justify-between mt-10 mb-4">
          <h2 className="font-semibold text-gray-800">Recent Thoughts</h2>
          <Link
            href="/all-thoughts"
            className="text-sm text-blue-600 hover:underline font-bold"
          >
            View All
          </Link>
        </div>

        <div
          className="
            grid gap-6
            sm:grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {thoughts.slice(0, limit).map((t) => (
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
