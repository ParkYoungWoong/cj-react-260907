import { Link } from 'react-router'
import { useMovieStore } from '@/stores/movie'
import { useQuery } from '@tanstack/react-query'
import type { MovieListResponse } from '@/types/movie'

export default function Movies() {
  const inputText = useMovieStore(s => s.inputText)
  const setInputText = useMovieStore(s => s.setInputText)
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)

  const { data: movies } = useQuery({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(
        `https://omdbapi.com?apikey=9d38c929&s=${searchText}`
      )
      const data: MovieListResponse = await res.json()
      return data.Response === 'True' ? data.Search : []
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: Boolean(searchText),
    placeholderData: prev => prev
  })

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
        {movies?.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
