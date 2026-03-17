"use client"

import { Star, Calendar, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

export default function ThoughtCard({
  id,
  title,
  description,
  tag,
  date,
  favorite,
  toggleFavorite,
  deleteThought,
  editThought
}: any) {

  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newDesc, setNewDesc] = useState(description)

  const tagColors: any = {
    Idea: "bg-blue-100 text-blue-700",
    Thought: "bg-yellow-100 text-yellow-700",
    Personal: "bg-pink-100 text-pink-700",
    Learning: "bg-green-100 text-green-700",
    Business: "bg-purple-100 text-purple-700",
    Random : "bg-orange-100 text-orange-700"
  }

  const saveEdit = () => {
    editThought(id, {
      title: newTitle,
      description: newDesc
    })
    setEditing(false)
  }

  return (
    <div className="bg-white border rounded-xl p-5 relative shadow-sm hover:shadow-md transition">

      {/* Favorite */}
      <Star
        size={18}
        onClick={() => toggleFavorite(id)}
        className={`absolute top-4 right-4 cursor-pointer ${
          favorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />

      {/* Tag */}
      <span
        className={`text-xs px-3 py-1 rounded-full font-medium ${
          tagColors[tag] || "bg-gray-100 text-gray-600"
        }`}
      >
        {tag}
      </span>

      {/* Edit Mode */}
      {editing ? (
        <div className="mt-3 space-y-2">

          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          />

          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          />

          <button
            onClick={saveEdit}
            className="text-xs bg-blue-900 text-white px-3 py-1 rounded"
          >
            Save
          </button>

        </div>
      ) : (
        <>
          <h3 className="font-semibold text-gray-800 mt-3">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            {description}
          </p>
        </>
      )}

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-5 text-xs text-gray-400">

        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-3">

          <Pencil
            size={15}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => setEditing(!editing)}
          />

          <Trash2
            size={15}
            className="cursor-pointer hover:text-red-500"
            onClick={() => deleteThought(id)}
          />

        </div>

      </div>

    </div>
  )
}
