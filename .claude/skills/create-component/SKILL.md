---
name: 'create-component'
description: 'React 함수형 컴포넌트 템플릿을 빠르게 생성하는 스킬'
model: 'haiku' # for Claude
effort: 'low'
---

다음 템플릿으로 사용자가 요청한 경로에 React 함수형 컴포넌트를 생성한다.
요청한 경로 앞에 `src`가 없으면 기본적으로 `src` 경로에 생성한다.

```tsx
// import { useState } from 'react'

export default function ComponentName() {
  return (
    <>
      <div></div>
    </>
  )
}
```
