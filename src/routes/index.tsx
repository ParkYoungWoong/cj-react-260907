import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
import Home from './pages/Home'
// import About from './pages/About'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
// import NotFound from './pages/NotFound'
// import SignIn from './pages/SignIn'
import requiresAuth from './loaders/requiresAuth'
import guestOnly from './loaders/guestOnly'

const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SignIn = lazy(() => import('./pages/SignIn'))

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
      },
      {
        path: '/signin',
        loader: guestOnly,
        element: <SignIn />
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
