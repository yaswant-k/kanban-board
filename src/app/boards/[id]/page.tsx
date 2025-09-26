'use client'

import { useParams, redirect } from 'next/navigation'
import { useAuthenticationStatus } from '@nhost/nextjs'
import {
  useOnBoardUpdatedSubscription,
  useInsertColumnToBoardMutation,
  useInsertCardToColumnMutation,
  useUpdateColumnPositionMutation,
  useUpdateCardPositionMutation,
} from '@/graphql/__generated__/graphql'
import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'

export default function BoardDetailPage() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const { id } = useParams<{ id: string }>()

  // 👇 Subscription instead of query
  const { data, loading, error } = useOnBoardUpdatedSubscription({
    variables: { id },
    skip: !isAuthenticated || !id,
  })

  const [insertColumn] = useInsertColumnToBoardMutation()
  const [insertCard] = useInsertCardToColumnMutation()
  const [updateColumnPos] = useUpdateColumnPositionMutation()
  const [updateCardPos] = useUpdateCardPositionMutation()

  const [showAddColumn, setShowAddColumn] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')

  if (isLoading) return <p>Loading auth…</p>
  if (!isAuthenticated) return redirect('/sign-in')
  if (loading) return <p>Loading board…</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data?.boards_by_pk) return <p>Board not found</p>

  const board = data.boards_by_pk

  // 🔑 Type aliases
  type ColumnType = typeof board.columns[number]
  type CardType = ColumnType['cards'][number]

  const handleSubmitNewColumn = async () => {
    const name = newColumnName.trim()
    if (!name) return
    const lastPosition = board.columns.at(-1)?.position ?? 0
    const newPosition = lastPosition + 1000
    await insertColumn({
      variables: { boardId: board.id, name, position: newPosition },
      refetchQueries: ['GetBoardById'],
    })
    setNewColumnName('')
    setShowAddColumn(false)
  }

  const handleAddCard = async (
    columnId: string,
    columnName: string,
    cards: CardType[]
  ) => {
    const title = prompt(`Card title for "${columnName}"`)
    if (!title) return
    const description = prompt('Card description') ?? ''
    const lastPosition = cards.at(-1)?.position ?? 0
    const newPosition = lastPosition + 1000
    await insertCard({
      variables: { columnId, title, description, position: newPosition },
      refetchQueries: ['GetBoardById'],
    })
  }

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Reorder columns
    if (type === 'COLUMN') {
      const movedColumn = board.columns[source.index]
      const prevCol = board.columns[destination.index - 1]
      const newPos = prevCol ? prevCol.position + 1000 : 1000

      await updateColumnPos({
        variables: { id: movedColumn.id, position: newPos },
        refetchQueries: ['GetBoardById'],
      })
    }

    // Reorder cards
    if (type === 'CARD') {
      const sourceCol = board.columns.find(
        (c: ColumnType) => c.id === source.droppableId
      )
      const destCol = board.columns.find(
        (c: ColumnType) => c.id === destination.droppableId
      )
      if (!sourceCol || !destCol) return

      const movedCard = sourceCol.cards[source.index]
      const prevCard = destCol.cards[destination.index - 1]
      const newPos = prevCard ? prevCard.position + 1000 : 1000

      await updateCardPos({
        variables: { id: movedCard.id, position: newPos },
        refetchQueries: ['GetBoardById'],
      })
    }
  }

  return (
    <main className="p-6">
      {/* Board title + Add Column */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{board.name}</h1>
        {!showAddColumn ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowAddColumn(true)}
          >
            + Add Column
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Column name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="px-3 py-2 border rounded w-48"
              autoFocus
            />
            <button
              onClick={handleSubmitNewColumn}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddColumn(false)
                setNewColumnName('')
              }}
              className="text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="flex space-x-4 overflow-x-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board.columns.map(
                (column: ColumnType, colIndex: number) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={colIndex}
                  >
                    {(provided) => (
                      <div
                        className="w-64 bg-gray-100 rounded p-4 shadow flex-shrink-0"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <h2
                          className="font-semibold mb-2"
                          {...provided.dragHandleProps}
                        >
                          {column.name}
                        </h2>

                        {/* Cards Droppable */}
                        <Droppable droppableId={column.id} type="CARD">
                          {(provided) => (
                            <ul
                              className="space-y-2 mb-2"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {column.cards.map(
                                (card: CardType, cardIndex: number) => (
                                  <Draggable
                                    key={card.id}
                                    draggableId={card.id}
                                    index={cardIndex}
                                  >
                                    {(provided) => (
                                      <li
                                        className="bg-white p-3 rounded shadow border border-gray-200"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <strong>{card.title}</strong>
                                        <p className="text-sm text-gray-600">
                                          {card.description}
                                        </p>
                                      </li>
                                    )}
                                  </Draggable>
                                )
                              )}
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>

                        {/* Add Card Button */}
                        <button
                          onClick={() =>
                            handleAddCard(
                              column.id,
                              column.name,
                              column.cards
                            )
                          }
                          className="text-sm text-blue-600 hover:underline"
                        >
                          + Add Card
                        </button>
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  )
}
