"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/SideBar"
import ThoughtInput from "@/components/ThoughtInput"
import ThoughtCard from "@/components/ThoughtCard"
import { useThoughts } from "@/lib/ThoughtContext"
import { useAuth } from "@/lib/AuthContext"

export default function Home() {
  const { user } = useAuth()
  const { thoughts, loading, addThought: addThoughtToDb, updateThought, deleteThought } = useThoughts()
  const [limit, setLimit] = useState(6)
  const [authError, setAuthError] = useState(false)

  // Check first visit 
  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return false

    const visited = localStorage.getItem("sparkpad-visited")
    if (!visited) {
      localStorage.setItem("sparkpad-visited", "true")
      return true
    }
    return false
  })

  // Responsive limit
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

    if (!user) {
      setAuthError(true)
      return
    }

    setAuthError(false)

    addThoughtToDb({
      title: thought.title,
      description: thought.description,
      tag: thought.tag,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      favorite: false
    })
  }

  const toggleFavorite = (id: number) => {
    const t = thoughts.find((t) => t.id === id)
    if (t) updateThought(id, { favorite: !t.favorite })
  }

  const editThought = (id: number, updated: Partial<typeof thoughts[0]>) => {
    updateThought(id, updated)
  }

  if (loading) return null

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

        {/* Auth error message — only shows if they tried adding while logged out */}
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mt-3">
            Please{" "}
            <Link href="/login" className="font-semibold underline">
              log in
            </Link>{" "}
            to save your thoughts.
          </div>
        )}

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