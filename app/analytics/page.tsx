"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/SideBar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

import {
  BarChart3,
  Star,
  Calendar,
  Tag
} from "lucide-react"

type Thought = {
  id: number
  title: string
  description: string
  tag: string
  date: string
  favorite: boolean
}

// 🎨 Tag Colors
const COLORS: Record<string, string> = {
  Idea: "#417af3",
  Thoughts: "#cfff20",
  Personal: "#ec4899",
  Learning: "#22c55e",
  Business: "#de16f9",
  Random: "#fc7310"
}

export default function AnalyticsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sparkpad-thoughts")

    if (saved) {
      try {
        setThoughts(JSON.parse(saved))
      } catch {
        setThoughts([])
      }
    }

    setLoaded(true)
  }, [])

  if (!loaded) return null

  // 📊 Stats
  const total = thoughts.length
  const favorites = thoughts.filter(t => t.favorite).length
  const categories = [...new Set(thoughts.map(t => t.tag))].length
  const thisWeek = thoughts.length

  // 📊 Category Count
  const categoryCount: Record<string, number> = {}

  thoughts.forEach(t => {
    categoryCount[t.tag] = (categoryCount[t.tag] || 0) + 1
  })

  const categoryData = Object.keys(categoryCount).map(tag => ({
    name: tag,
    value: categoryCount[tag]
  }))

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen md:ml-64">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Analytics 📊
        </h1>
        <p className="text-gray-500 mb-6">
          Insights into your thought patterns
        </p>

        {/* ✅ Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Thoughts" value={total} color="blue" />
          <StatCard title="Favorites" value={favorites} color="yellow" />
          <StatCard title="This Week" value={thisWeek} color="purple" />
          <StatCard title="Categories" value={categories} color="green" />
        </div>

        {/* ✅ Bar Chart */}
        <div className="bg-white rounded-xl p-5 mb-8">
          <h3 className="mb-4 font-semibold text-gray-800">
            Category Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill="#a855f7" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryData.map((c, i) => (
            <div
              key={i}
              className="rounded-xl p-4 border text-sm relative"
              style={{
                backgroundColor: COLORS[c.name] + "20",
                borderColor: COLORS[c.name]
              }}
            >
              <p className="font-medium" style={{ color: COLORS[c.name] }}>
                {c.name}
              </p>

              {/* Background number (colored, more visible) */}
              <span
                className="absolute bottom-2 right-3 text-4xl md:text-5xl font-extrabold opacity-60"
                style={{ color: COLORS[c.name] }}
              >
                {c.value}
              </span>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

// ✅ Stat Card
function StatCard({ title, value, color }: any) {

  const styles: any = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      icon: <BarChart3 size={18} />
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      icon: <Star size={18} />
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <Calendar size={18} />
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <Tag size={18} />
    }
  }

  const current = styles[color]

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${current.bg} ${current.text}`}
      >
        {current.icon}
      </div>

      {/* Title */}
      <p className="text-sm text-gray-500">{title}</p>

      {/* Background number (colored, more visible) */}
      <span
        className="absolute bottom-2 right-3 text-4xl md:text-5xl font-extrabold opacity-60"
        style={{ color: current.text.replace("text-", "").replace(/-/g, "") ? "" : "" }}
      >
        {value}
      </span>

    </div>
  )
}
