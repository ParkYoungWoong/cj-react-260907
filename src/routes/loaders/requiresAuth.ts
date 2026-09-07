import { redirect } from 'react-router'

export default function () {
  // 인증 확인..
  if (true) {
    return true
  }
  return redirect('/signin')
}
