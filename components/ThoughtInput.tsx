"use client"

import { useState } from "react"
import { Sparkles, Plus } from "lucide-react"

export default function ThoughtInput({ addThought }: any) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [tag, setTag] = useState("Idea")

  const tags = ["Idea", "Coding", "Personal", "Learning", "Business"]

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
        <Sparkles className="text-purple-500" size={18} />

        <input
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {open && (
        <div className="mt-4 space-y-4">

          <textarea
            placeholder="Add more details... (optional)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border rounded-lg p-3 text-sm"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  tag === t
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-50"
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
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={16} />
              Add Thought
            </button>

          </div>

        </div>
      )}
    </div>
  )
}
