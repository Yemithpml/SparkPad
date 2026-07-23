'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { useAuth } from './AuthContext'

export type Thought = {
  id: number
  title: string
  description: string
  tag: string
  date: string
  favorite: boolean
  user_id?: string
}

type ThoughtsContextType = {
  thoughts: Thought[]
  loading: boolean
  addThought: (thought: Omit<Thought, 'id' | 'user_id'>) => Promise<void>
  updateThought: (id: number, updates: Partial<Thought>) => Promise<void>
  deleteThought: (id: number) => Promise<void>
}

const ThoughtsContext = createContext<ThoughtsContextType>({
  thoughts: [],
  loading: true,
  addThought: async () => {},
  updateThought: async () => {},
  deleteThought: async () => {},
})

export function ThoughtsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchThoughts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('date', { ascending: false })

    if (error) console.error('Supabase error:', error.message, error.details, error.hint)
    else setThoughts(data as Thought[])
    setLoading(false)
  }

  useEffect(() => {
    if (user) fetchThoughts()
    else {
      setThoughts([])
      setLoading(false)
    }
  }, [user])

  async function addThought(thought: Omit<Thought, 'id' | 'user_id'>) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ ...thought, user_id: user?.id }])
      .select()

    if (error) console.error('Supabase insert error:', error.message, error.details, error.hint)
    else if (data) setThoughts((prev) => [data[0] as Thought, ...prev])
  }

  async function updateThought(id: number, updates: Partial<Thought>) {
    const { error } = await supabase.from('notes').update(updates).eq('id', id)
    if (error) console.error(error)
    else setThoughts((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  async function deleteThought(id: number) {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) console.error(error)
    else setThoughts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ThoughtsContext.Provider value={{ thoughts, loading, addThought, updateThought, deleteThought }}>
      {children}
    </ThoughtsContext.Provider>
  )
}

export const useThoughts = () => useContext(ThoughtsContext)