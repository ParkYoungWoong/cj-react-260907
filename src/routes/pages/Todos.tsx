import { useQuery, useMutation } from '@tanstack/react-query'
import type { Todo } from '@/types/todo'
import { useState } from 'react'

const API_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const API_HEADERS = {
  'content-type': 'application/json',
  apikey: 'KDT8_bcAWVpD8',
  username: 'KDT8_ParkYoungWoong'
}

export default function Todos() {
  const [title, setTitle] = useState('')

  const { data: todos } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(API_URL, {
        method: 'GET',
        headers: API_HEADERS
      })
      const todos = await res.json()
      return todos
    }
  })

  // const 반환 = useMutation(옵션)
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!title.trim()) return
      await new Promise(resolve => setTimeout(resolve, 3000))
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          title: title
        })
      })
      const todo = await res.json()
      return todo
    },
    onMutate: () => {},
    onSuccess: (todo: Todo) => {
      const prevTodos = queryClient.getQueryData(['todos'])
    },
    onError: () => {},
    onSettled: () => {}
  })

  return (
    <>
      <div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              mutate()
            }
          }}
        />
        <button onClick={() => mutate()}>추가!</button>
      </div>
      {todos?.map(todo => {
        return <div key={todo.id}>{todo.title}</div>
      })}
    </>
  )
}
