// import { useState } from 'react'
import { useCountStore } from '@/stores/count'

export default function Home() {
  const count = useCountStore(s => s.count)
  const double = useCountStore(s => s.double)
  const increase = useCountStore(s => s.increase)

  return (
    <>
      <div>Home Page!</div>
      <div>
        {count} / {double}
      </div>
      <button onClick={() => increase()}>증가</button>
    </>
  )
}
