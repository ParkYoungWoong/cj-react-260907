import { redirect } from 'react-router'

// http://localhost:5174/movies/tt2250912?a=123&b=456#hello
export default function ({ request }: { request: Request }) {
  const token = localStorage.getItem('token')

  // 인증 완료
  if (token) return true

  // 인증 실패
  const { pathname } = new URL(request.url) // '/movies/tt2250912'
  return redirect(`/signin?redirectTo=${pathname}`)
}
