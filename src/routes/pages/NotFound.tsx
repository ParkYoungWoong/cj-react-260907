import { Link } from 'react-router'

export default function NotFound() {
  return (
    <>
      <div>페이지 주소를 찾을 수 없습니다.</div>
      <Link to="/">홈으로 가기</Link>
    </>
  )
}
