'use client'

import { useAuthenticationStatus } from '@nhost/react'
import { redirect } from 'next/navigation'
import { useGetBoardsQuery } from '@/graphql/__generated__/graphql'

export default function BoardsPage() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  const { data, loading, error } = useGetBoardsQuery({
    skip: !isAuthenticated,
  })

  if (isLoading) return <p>Loading auth…</p>
  if (!isAuthenticated) return redirect('/sign-in')
  if (loading) return <p>Loading boards…</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Boards</h1>
      <ul className="space-y-2">
      {data?.boards?.map((board: typeof data.boards[number]) => (
          <li key={board.id} className="border p-4 rounded shadow">
            <strong>{board.name}</strong>
          </li>
        ))}
      </ul>
    </main>
  )
}
