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
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 gap-3 z-50">

        {/* Hamburger */}
        <button onClick={() => setOpen(true)}>
          <Menu size={22} className="text-black" />
        </button>

        {/* Logo */}
        <h2 className="text-lg font-semibold text-gray-900">
          SparkPad
        </h2>

      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-screen w-64 bg-white border-r
        flex flex-col justify-between p-6 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >

        {/* Close button (mobile) */}
        <div className="md:hidden flex justify-end">
          <X
            size={20}
            className="cursor-pointer text-black"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Logo desktop */}
        <div className="hidden md:block">
          <h2 className="text-xl font-semibold text-gray-900">
            SparkPad
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Your second brain
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          <Link
            href="/"
            className="flex items-center gap-3 bg-purple-100 text-purple-600 px-4 py-3 rounded-lg"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/all-thoughts"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg"
          >
            <Lightbulb size={18} />
            All Thoughts
          </Link>

          <Link
            href="/favorites"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg"
          >
            <Star size={18} />
            Favorites
          </Link>

          <Link
            href="/tags"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg"
          >
            <Tag size={18} />
            Tags
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg"
          >
            <BarChart3 size={18} />
            Analytics
          </Link>

        </nav>

        {/* Quick Tip */}
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm font-medium mb-1">💡 Quick Tip</p>

          <p className="text-xs text-gray-600">
            Press
            <kbd className="px-1.5 py-0.5 bg-white rounded border mx-1">⌘</kbd>
            +
            <kbd className="px-1.5 py-0.5 bg-white rounded border mx-1">K</kbd>
            to quickly capture thoughts
          </p>
        </div>

      </aside>
    </>
  )
}
