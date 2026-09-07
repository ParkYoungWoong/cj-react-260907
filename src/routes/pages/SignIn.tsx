// import { useState, useRef } from 'react'
// import type { SubmitEvent } from 'react'

// 3시 3분까지 쉬는 시간!
export default function SignIn() {
  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const id = formData.get('id')
    const pw = formData.get('pw')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
        />
        <input
          type="password"
          name="pw"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  )
}
