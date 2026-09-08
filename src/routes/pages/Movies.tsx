import { Link } from 'react-router'
import { Fragment } from 'react'
import { useMovieStore } from '@/stores/movie'
import {
  useInfiniteQuery,
  useQueryClient,
  infiniteQueryOptions
} from '@tanstack/react-query'
import type { MovieListResponse } from '@/types/movie'

export default function Movies() {
  const inputText = useMovieStore(s => s.inputText)
  const setInputText = useMovieStore(s => s.setInputText)
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const queryClient = useQueryClient()

  const options = infiniteQueryOptions({
    queryKey: ['movies', searchText],
    queryFn: async ({ pageParam }) => {
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(
        `https://omdbapi.com?apikey=9d38c929&s=${searchText}&page=${pageParam}`
      )
      const data: MovieListResponse = await res.json()
      return data
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(searchText),
    placeholderData: prev => prev,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // 예시) '821' => 821 => 82.1 => 83
      if (lastPage.Response === 'True') {
        const maxPage = Math.ceil(Number(lastPage.totalResults) / 10)
        const currentPage = pages.length
        if (currentPage < maxPage) {
          return currentPage + 1
        }
      }
      return null
    },
    select: data => {
      return data.pages.flatMap(page => {
        return page.Response === 'True' ? page.Search : []
      })
    }
  })
  const { data: movies, isFetching, fetchNextPage } = useInfiniteQuery(options)

  function fetchMovies() {
    setSearchText(inputText)
  }

  function refetch() {
    queryClient.fetchQuery(options)
  }

  return (
    <>
      <button onClick={() => refetch()}>다시 가져오기</button>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <button onClick={() => fetchMovies()}>검색</button>
      </div>
      {isFetching && <div>가져오는 중입니다..</div>}
      <ul>
        {/* {data?.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.Search.map(movie => {
                return (
                  <li key={movie.imdbID}>
                    <Link to={`/movies/${movie.imdbID}`}>
                      {movie.Title} ({movie.Year})
                    </Link>
                  </li>
                )
              })}
            </Fragment>
          )
        })} */}
        {movies?.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => fetchNextPage()}>더보기</button>
    </>
  )
}
