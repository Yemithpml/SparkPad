'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (authError) setError(authError.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {isSignUp
            ? 'Sign up to start saving your Thoughts.'
            : 'Log in to access your Thoughts.'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white text-sm font-medium rounded-lg py-2.5 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isSignUp
            ? 'Already have an account? Log in'
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  )
}