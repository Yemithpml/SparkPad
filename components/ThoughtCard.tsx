"use client"

import { useState, useEffect } from "react"
import { Star, Calendar, Trash2, X } from "lucide-react"

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

  // States
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const [newTitle, setNewTitle] = useState(title)
  const [newDesc, setNewDesc] = useState(description)

  // Tag Colors
  const tagColors: any = {
    Idea: {
      card: "bg-blue-50",
      tag: "bg-blue-100 text-blue-700",
      button: "bg-blue-600 text-white hover:bg-blue-700"
    },
    Thought: {
      card: "bg-yellow-50",
      tag: "bg-yellow-100 text-yellow-700",
      button: "bg-yellow-500 text-white hover:bg-yellow-600"
    },
    Personal: {
      card: "bg-pink-50",
      tag: "bg-pink-100 text-pink-700",
      button: "bg-pink-500 text-white hover:bg-pink-600"
    },
    Learning: {
      card: "bg-green-50",
      tag: "bg-green-100 text-green-700",
      button: "bg-green-600 text-white hover:bg-green-700"
    },
    Business: {
      card: "bg-purple-50",
      tag: "bg-purple-100 text-purple-700",
      button: "bg-purple-600 text-white hover:bg-purple-700"
    },
    Random: {
      card: "bg-orange-50",
      tag: "bg-orange-100 text-orange-700",
      button: "bg-orange-500 text-white hover:bg-orange-600"
    }
  }

  const style = tagColors[tag] || tagColors["Idea"]

  const saveEdit = () => {
    editThought(id, {
      title: newTitle,
      description: newDesc
    })
    setToast("Saved successfully!")
    setOpen(false)
  }

  const handleDelete = () => {
    deleteThought(id)
    setToast("Deleted 🗑️")
    setConfirmDelete(false)
    setOpen(false)
  }

  // Toast Limit
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <>
      {/* Cards */}
      <div
        onClick={() => setOpen(true)}
        className={`rounded-2xl p-5 border ${style.card} relative hover:shadow-md transition cursor-pointer`}
      >

        <Star
          size={18}
          onClick={(e) => {
            e.stopPropagation() //prevents modal from opening
            toggleFavorite(id)
          }}
          className={`absolute top-4 right-4 cursor-pointer transition ${
            favorite ? "fill-yellow-400 text-yellow-400 scale-110" : "text-gray-300"
          }`}
        />

        <span className={`text-xs px-3 py-1 rounded-full font-medium ${style.tag}`}>
          {tag}
        </span>

        <h3 className="font-semibold text-gray-800 mt-3">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">
          <Calendar size={14} />
          <span>{date}</span>
        </div>
      </div>

      {/* MAIN MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative animate-scaleIn">

            <X
              className="absolute top-4 right-4 cursor-pointer text-gray-600"
              onClick={() => setOpen(false)}
            />

            <span className={`text-xs px-3 py-1 rounded-full font-medium ${style.tag}`}>
              {tag}
            </span>

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full mt-4 border rounded p-2 text-gray-700 text-sm"
            />

            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full mt-3 border rounded p-2 text-gray-700 text-sm"
            />

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
              <Calendar size={14} />
              <span>{date}</span>
            </div>

            <div className="flex justify-between items-center mt-6">

              <button
                onClick={() => setConfirmDelete(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition transform hover:scale-105 ${style.button}`}
              >
                <Trash2 size={16} />
              </button>

              <button
                onClick={saveEdit}
                className={`px-4 py-2 rounded-lg text-sm transition transform hover:scale-105 ${style.button}`}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">

          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">

            <p className="font-semibold mb-2 text-gray-700">Delete this thought?</p>
            <p className="text-sm text-gray-700 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-lg border text-sm text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg text-sm shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}
    </>
  )
}
