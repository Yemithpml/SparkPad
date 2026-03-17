"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard
    },
    {
      name: "All Thoughts",
      href: "/all-thoughts",
      icon: Lightbulb
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: Star
    },
    {
      name: "Tags",
      href: "/tags",
      icon: Tag
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3
    }
  ]

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 gap-3 z-50">

        <button onClick={() => setOpen(true)}>
          <Menu size={22} className="text-gray-700" />
        </button>

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

        {/* Top */}
        <div className="p-5">

          {/* Mobile close */}
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

          <hr className="my-4" />

          {/* Navigation */}
          <nav className="space-y-1">

            {navItems.map((item) => {

              const Icon = item.icon
              const active = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${
                      active
                        ? "bg-blue-100 text-blue-600 mt-5"
                        : "text-gray-700 hover:bg-gray-100 mt-5"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              )
            })}

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
              <kbd className="px-1.5 py-0.5 bg-white rounded border mx-1">⌘</kbd>
              +
              <kbd className="px-1.5 py-0.5 bg-white rounded border mx-1">K</kbd>
              to quickly capture thoughts
            </p>

          </div>

        </div>

      </aside>
    </>
  )
}
