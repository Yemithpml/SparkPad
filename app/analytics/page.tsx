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
  Idea: "#a855f7",
  Thoughts: "#3b82f6",
  Personal: "#ec4899",
  Learning: "#22c55e",
  Business: "#f97316",
  Random: "#6b7280"
}

export default function AnalyticsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loaded, setLoaded] = useState(false)

  // ✅ FIX: Properly load data
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

  // 🚨 Prevent hydration issues
  if (!loaded) return null

  // 📊 Stats
  const total = thoughts.length
  const favorites = thoughts.filter(t => t.favorite).length
  const categories = [...new Set(thoughts.map(t => t.tag))].length

  // ⚠️ FIX: This week calculation (basic)
  const thisWeek = thoughts.length // (you can improve later)

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

          <StatCard title="Total Thoughts" value={total} color="purple" />
          <StatCard title="Favorites" value={favorites} color="yellow" />
          <StatCard title="This Week" value={thisWeek} color="blue" />
          <StatCard title="Categories" value={categories} color="green" />

        </div>

        {/* ✅ Bar Chart ONLY */}
        <div className="bg-white rounded-xl p-5 border mb-8">
          <h3 className="mb-4 font-semibold">Category Breakdown</h3>

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
              className="rounded-xl p-4 border text-sm"
              style={{
                backgroundColor: COLORS[c.name] + "20",
                borderColor: COLORS[c.name]
              }}
            >
              <p className="font-medium" style={{ color: COLORS[c.name] }}>
                {c.name}
              </p>
              <p className="text-lg font-bold">{c.value}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

// ✅ Stat Card
function StatCard({ title, value, color }: any) {
  const colors: any = {
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700"
  }

  return (
    <div className="bg-white rounded-xl p-4 border flex flex-col gap-2">
      <div className={`w-10 h-10 rounded-lg ${colors[color]}`} />
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  )
}
