import { Link } from 'react-router'
import { useEffect } from 'react'
import { useMovieStore } from '@/stores/movie'
import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query'
import type { MovieListResponse } from '@/types/movie'
import { useInView } from 'react-intersection-observer'

export default function Movies() {
  const inputText = useMovieStore(s => s.inputText)
  const setInputText = useMovieStore(s => s.setInputText)
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const { ref, inView } = useInView({
    rootMargin: '500px'
  })

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
  const {
    data: movies,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteQuery(options)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
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
      {/* 잘못된 코드!
      {(isFetching || !hasNextPage) && (
        <button
          ref={observerRef}
          onClick={() => fetchNextPage()}>
          더보기
        </button>
      )} */}
      <button
        ref={ref}
        style={{
          display: isFetching || !hasNextPage ? 'none' : 'block'
        }}
        onClick={() => fetchNextPage()}>
        더보기
      </button>
    </>
  )
}
