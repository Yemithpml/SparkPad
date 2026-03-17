"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Lightbulb,
  Star,
  Tag,
  BarChart3,
  Menu,
  X
} from "lucide-react"

export default function Sidebar() {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 gap-3 z-50">

        {/* Hamburger */}
        <button onClick={() => setOpen(true)}>
          <Menu size={22} className="text-gray-700" />
        </button>

        {/* Logo */}
        <h2 className="text-lg text-gray-900 font-semibold">
          SparkPad
        </h2>

      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-screen w-64 bg-white border-r
        flex flex-col justify-between
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >

        {/* Top Section */}
        <div className="p-5">

          {/* Mobile Close */}
          <div className="flex justify-between items-center md:hidden mb-4">

            <h2 className="text-lg text-gray-900 font-semibold">
              SparkPad
            </h2>

            <X
              size={20}
              className="cursor-pointer text-gray-700"
              onClick={() => setOpen(false)}
            />

          </div>

          {/* Desktop Logo */}
          <div className="hidden md:block">
            <h2 className="text-xl text-gray-900 font-semibold">
              SparkPad
            </h2>

            <p className="text-xs font-thin text-gray-400">
              Your second brain
            </p>
          </div>

          {/* Divider */}
          <hr className="my-4" />

          {/* Navigation */}
          <nav className="space-y-1">

            <Link
              href="/"
              className="flex items-center gap-3 bg-blue-100 text-blue-600 px-4 py-3 mt-10 rounded-lg"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/all-thoughts"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 mt-2 rounded-lg"
            >
              <Lightbulb size={18} />
              All Thoughts
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 mt-2 rounded-lg"
            >
              <Star size={18} />
              Favorites
            </Link>

            <Link
              href="/tags"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 mt-2 rounded-lg"
            >
              <Tag size={18} />
              Tags
            </Link>

            <Link
              href="/analytics"
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-3 mt-2 rounded-lg"
            >
              <BarChart3 size={18} />
              Analytics
            </Link>

          </nav>

        </div>

        {/* Quick Tip */}
        <div className="p-5 border-t">

          <div className="bg-purple-50 rounded-lg p-4">

            <p className="text-sm font-medium mb-1">
              💡 Quick Tip
            </p>

            <p className="text-xs text-gray-600">
              Press
              <kbd className="px-1.5 py-0.5 bg-white rounded border mx-1">
                ⌘
              </kbd>
              +
              <kbd className="px-1.5 py-0.5 bg-white rounded border mx-1">
                K
              </kbd>
              to quickly capture thoughts
            </p>

          </div>

        </div>

      </aside>
    </>
  )
}
