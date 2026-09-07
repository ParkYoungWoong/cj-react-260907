// import { useState } from 'react'
import { Link } from 'react-router'

export default function Header() {
  return (
    <>
      <header className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/signin">Sign In</Link>
      </header>
    </>
  )
}
