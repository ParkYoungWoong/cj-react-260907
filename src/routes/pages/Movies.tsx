import { useState } from 'react'
import { Link } from 'react-router'
import type { MovieListResponse, SimpleMovie } from '@/types/movie'

export default function Movies() {
  const [searchText, setSearchText] = useState('')
  // const [movies, setMovies] = useState<MovieListResponse['Search']>([])
  const [movies, setMovies] = useState<SimpleMovie[]>([])

  async function fetchMovies() {
    const res = await fetch(
      `https://omdbapi.com?apikey=9d38c929&s=${searchText}`
    )
    const data: MovieListResponse = await res.json()
    setMovies(data.Response === 'True' ? data.Search : [])
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <button onClick={() => fetchMovies()}>검색</button>
      </div>
      <ul>
        {movies.map(movie => (
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
