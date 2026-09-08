import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

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
    onMutate: () => {
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos']) // 캐시 데이터 가져오기 / .getQueryData(쿼리키)
      if (!prevTodos) return
      const todo: Todo = {
        id: Math.random().toString(),
        title: title,
        done: false
      }
      queryClient.setQueryData(['todos'], [todo, ...prevTodos]) // 캐시 데이터 갱신하기 / .setQueryData(쿼리키, 데이터)
      return prevTodos
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }) // 새 데이터 가져오기!
    },
    onError: (_error, _payload, prevTodos) => {
      if (prevTodos) {
        queryClient.setQueryData(['todos'], prevTodos)
        alert('문제가 발생했습니다. 다시 시도해 주세요~')
      }
    },
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
