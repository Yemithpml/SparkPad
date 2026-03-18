"use client"

import { useState } from "react"
import { Star, Calendar, Pencil, Trash2 } from "lucide-react"

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

  // 🎨 Tag Colors
  const tagColors: any = {
    Idea: { card: "bg-blue-50", tag: "bg-blue-100 text-blue-700" },
    Thought: { card: "bg-yellow-50", tag: "bg-yellow-100 text-yellow-700" },
    Personal: { card: "bg-pink-50", tag: "bg-pink-100 text-pink-700" },
    Learning: { card: "bg-green-50", tag: "bg-green-100 text-green-700" },
    Business: { card: "bg-purple-50", tag: "bg-purple-100 text-purple-700" },
    Random: { card: "bg-orange-50", tag: "bg-orange-100 text-orange-700" }
  }

  const style = tagColors[tag] || tagColors["Idea"]

  const saveEdit = () => {
    editThought(id, {
      title: newTitle,
      description: newDesc
    })
    setEditing(false)
  }

  return (
    <div className={`rounded-2xl p-5 border ${style.card} relative hover:shadow-md transition`}>

      {/* Favorite Star */}
      <Star
        size={18}
        onClick={() => toggleFavorite(id)}
        className={`absolute top-4 right-4 cursor-pointer ${
          favorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />

      {/* Tag */}
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${style.tag}`}>
        {tag}
      </span>

      {/* Edit Mode */}
      {editing ? (
        <div className="mt-3 space-y-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded p-2 text-gray-600 text-sm"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full border rounded p-2 text-gray-600 text-sm"
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
          <h3 className="font-semibold text-gray-800 mt-3">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </>
      )}

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-5 text-xs text-gray-400">

        {/* Date */}
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{date}</span>
        </div>

        {/* Edit & Delete */}
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
