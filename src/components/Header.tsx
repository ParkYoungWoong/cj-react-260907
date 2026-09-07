// import { useState } from 'react'
import { Link } from 'react-router'

export default function Header() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </>
  )
}
