import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import type { Movie } from '@/types/movie'

// http://localhost:5173/movies/tt12345678?plot=full
export default function MovieDetails() {
  const { movieId } = useParams()
  const [searchParams] = useSearchParams()
  const plot = searchParams.get('plot') || 'short'
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://omdbapi.com?apikey=9d38c929&i=${movieId}&plot=${plot}`
      )
      const data = await res.json()
      setMovie(data)
    }
    fetchMovie()
  }, [])

  return (
    <>
      {movie && (
        <>
          <div>{movie.Title}</div>
          <div>{movie.Plot}</div>
        </>
      )}
    </>
  )
}
