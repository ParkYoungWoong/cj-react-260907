import { redirect } from 'react-router'

export default function () {
  const token = localStorage.getItem('token')

  // 인증됨
  if (token) return redirect('/')

  // 인증 안 됨
  return true
}
