export interface MovieListResponseSuccess {
  Response: 'True'
  Search: SimpleMovie[]
  totalResults: string
}
export interface MovieListResponseFailure {
  Response: 'False'
  Error: string
}
export type MovieListResponse =
  MovieListResponseSuccess | MovieListResponseFailure
export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}
