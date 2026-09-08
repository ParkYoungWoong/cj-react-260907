// import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Text() {
  const { data } = useQuery({
    queryKey: ['My Key'],
    queryFn: async () => {
      // 서버에서 데이터 가져오기..
      return 123
    },
    select: data => {
      console.log(data) // 123
      return data * 2 // 246
    },
    staleTime: 1000 * 60 * 10
  })

  return (
    <>
      <div>{data}</div>
    </>
  )
}
