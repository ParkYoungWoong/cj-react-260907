// import { useState, useRef } from 'react'
// import type { SubmitEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

// 3시 3분까지 쉬는 시간!
export default function SignIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const id = formData.get('id')
    const pw = formData.get('pw')
    if (id && pw) {
      // 로그인 요청 전송
      // 로그인 응답 처리
      // Access Token 저장
      localStorage.setItem('token', 'jwt.1234567890')
      // 리다이렉트('/'), redirectTo 예시) '/movies/tt2250912'
      navigate(redirectTo || '/')
    }
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
