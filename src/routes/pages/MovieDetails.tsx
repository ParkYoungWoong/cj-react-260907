import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

// http://localhost:5173/movies/tt1234567890
export default function MovieDetails() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://omdbapi.com?apikey=9d38c929&i=${movieId}`
      )
      const data = await res.json()
      setMovie(data)
    }
    fetchMovie()
  }, [])

  return (
    <>
      <div>{movie?.Title}</div>
    </>
  )
}
