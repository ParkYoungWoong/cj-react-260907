import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { MovieListResponse, SimpleMovie } from '@/types/movie'

export const useMovieStore = create(
  combine(
    {
      searchText: '',
      movies: [] as SimpleMovie[]
    },
    (set, get) => {
      return {
        setSearchText(searchText: string) {
          set({ searchText })
        },
        async fetchMovies() {
          const { searchText } = get()
          const res = await fetch(
            `https://omdbapi.com?apikey=9d38c929&s=${searchText}`
          )
          const data: MovieListResponse = await res.json()
          set({
            movies: data.Response === 'True' ? data.Search : []
          })
        }
      }
    }
  )
)
