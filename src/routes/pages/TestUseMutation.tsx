// import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export default function Text() {
  const { mutate } = useMutation({
    mutationFn: async (n: number) => {
      // 할 일 항목 추가하는 요청 보내기...
      // throw new Error('에러!')
      return 123 + n // 125
    },
    onMutate: n => {
      console.log(n) // 2
      // 낙관적 업데이트!
      return '원본데이터'
    },
    onSuccess: (num: number) => {
      console.log(num) // 125
    },
    onError: (_error, _n, origin) => {
      console.log(origin) // '원본데이터'
    },
    onSettled: () => {}
  })

  return (
    <>
      <div>
        <button onClick={() => mutate(2)}>추가</button>
      </div>
    </>
  )
}
