import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
import Home from './pages/Home'
import About from './pages/About'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import requiresAuth from './loaders/requiresAuth'

// 라우트 객체
const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/', // http://localhost:5173/
        element: <Home />
      },
      {
        path: '/about', // http://localhost:5173/about
        element: <About />
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/movies/:movieId',
        loader: requiresAuth,
        element: <MovieDetails />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
