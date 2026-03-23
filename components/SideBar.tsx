"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/Logo"




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

        <div className="flex items-center gap-2">
          <Logo size={24} text="" /> 
          <span className="text-lg text-gray-900 font-semibold">SparkPad</span>
        </div>


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

           <div className="flex items-center gap-2">
              <Logo size={24} text="" /> 
              <span className="text-lg text-gray-900 font-semibold">SparkPad</span>
           </div>


            <X
              size={20}
              className="cursor-pointer text-gray-700"
              onClick={() => setOpen(false)}
            />

          </div>

          {/* Desktop Logo */}
        <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <Logo size={28} text="" />
              <span className="text-xl text-gray-900 font-semibold">SparkPad</span>
            </div>
           <p className="text-sm font-md text-gray-500 mt-1">
              Your second brain
           </p>

        </div>

          <hr className="my-4" />

          {/* Navigation */}
          <nav className="space-y-1 font-semibold">

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

      </aside>
    </>
  )
}
