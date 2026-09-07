import { useState } from 'react'

export default function Movies() {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState([])

  async function fetchMovies() {
    const res = await fetch(
      `https://omdbapi.com?apikey=9d38c929&s=${searchText}`
    )
    const data = await res.json()
    setMovies(data.Search || [])
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
            {movie.Title} ({movie.Year})
          </li>
        ))}
      </ul>
    </>
  )
}
