import { useState } from 'react'

function getDouble(count: number) {
  return count * 2
}

export default function About() {
  const [count, setCount] = useState(0)
  // const double = useMemo(() => getDouble(count), [count])
  const double = getDouble(count)

  return (
    <>
      <div>About Page!</div>
      <div>
        {count} / {double}
      </div>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </>
  )
}
