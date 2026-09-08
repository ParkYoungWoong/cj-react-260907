import { useParams, useSearchParams } from 'react-router'
import type { Movie } from '@/types/movie'
import { useQuery } from '@tanstack/react-query'

// http://localhost:5173/movies/tt12345678?plot=full
export default function MovieDetails() {
  const { movieId } = useParams()
  const [searchParams] = useSearchParams()
  const plot = searchParams.get('plot') || 'short'

  // const 반환 = useQuery(옵션)
  const { data: movie } = useQuery<Movie>({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=9d38c929&i=${movieId}&plot=${plot}`
      )
      const abc = await res.json()
      return abc
    },
    staleTime: 1000 * 60 * 5
  })

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
