export interface MovieListResponse {
  Search: SimpleMovie[]
  totalResults: string
  Response: string
}
export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
