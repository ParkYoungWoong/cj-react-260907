import { create } from 'zustand'
import { combine, subscribeWithSelector, persist } from 'zustand/middleware'

// persist(미들웨어, 옵션)
export const useCountStore = create(
  persist(
    subscribeWithSelector(
      combine(
        {
          count: 0,
          double: 0
        },
        (set, get) => {
          return {
            increase() {
              const { count } = get()
              set({ count: count + 1 })
            }
          }
        }
      )
    ),
    {
      name: 'Count Store',
      version: 1
    }
  )
)

// useCountStore.subscribe(선택함수, 실행할함수)
useCountStore.subscribe(
  state => state.count, // 선택 함수!(선택자)
  () => {
    const { count } = useCountStore.getState() // === get()
    useCountStore.setState({
      double: count * 2
    })
  } // 실행 함수!
)

// create(
//   미들웨어(
//     미들웨어(
//       미들웨어(
//         미들웨어()
//       )
//     )
//   )
// )
