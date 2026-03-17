"use client"

import { useState } from "react"
import Sidebar from "@/components/SideBar"
import ThoughtInput from "@/components/ThoughtInput"
import ThoughtCard from "@/components/ThoughtCard"

export default function Home() {

  const [thoughts, setThoughts] = useState<any[]>([])

  const addThought = (thought: any) => {
    setThoughts([thought, ...thoughts])
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
        {/* md:ml-64 adds left margin equal to sidebar width on medium+ screens */}

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-900 font-bold">
            Welcome back! 
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            What's on your mind today?
          </p>
        </div>

        {/* Thought Input */}
        <ThoughtInput addThought={addThought} />

        {/* Recent Thoughts */}
        <h2 className="font-semibold mb-4 text-gray-800 mt-10">
          Recent Thoughts
        </h2>

        <div className="
          grid gap-6
          sm:grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
        ">
          {thoughts.map((t, index) => (
            <ThoughtCard
              key={index}
              title={t.title}
              description={t.description}
              tag={t.tag}
            />
          ))}
        </div>

      </main>

    </div>
  )
}
