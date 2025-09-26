'use client'

import { useState } from 'react'
import { useSignInEmailPassword } from '@nhost/react'
import { redirect } from 'next/navigation'

export default function SignInPage() {
  const { signInEmailPassword, isLoading, isSuccess, error } = useSignInEmailPassword()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  if (isSuccess) redirect('/boards')

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isLoading ? 'Signing in…' : 'Sign In'}
        </button>
        {error && <p className="text-red-600">{error.message}</p>}
      </form>
    </main>
  )
}
