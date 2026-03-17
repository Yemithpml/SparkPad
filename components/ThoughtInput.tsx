"use client"

import { useState } from "react"
import { Sparkles, Plus } from "lucide-react"

export default function ThoughtInput({ addThought }: any) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [tag, setTag] = useState("Idea")

  const tags = ["Idea", "Thought", "Personal", "Learning", "Business", "Random"]

  const tagColors: any = {
    Idea: "bg-blue-100 text-blue-700 border-blue-300",
    Thought: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Personal: "bg-pink-100 text-pink-700 border-pink-300",
    Learning: "bg-green-100 text-green-700 border-green-300",
    Business: "bg-purple-100 text-purple-700 border-purple-300",
    Random: "bg-orange-100 text-orange-700 border-orange-300"
  }

  const handleAdd = () => {
    if (!title) return

    addThought({
      title,
      description: details,
      tag
    })

    setTitle("")
    setDetails("")
    setOpen(false)
  }

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">

      {/* Title */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 cursor-text"
      >
        <Sparkles className="text-blue-500" size={18} />

        <input
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none text-gray-700 font-medium"
        />
      </div>

      {open && (
        <div className="mt-4 space-y-4">

          <textarea
            placeholder="Add more details... (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg p-3 text-sm text-gray-600"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  tag === t
                    ? tagColors[t]
                    : "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-4">

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500"
            >
              Cancel
            </button>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={26} />
              
            </button>

          </div>

        </div>
      )}
    </div>
  )
}
