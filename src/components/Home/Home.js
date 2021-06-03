import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Find Your Community Garden</h1>
      <Link to='/gardens'>
        <Button>Search All</Button>
      </Link>
    </div>
  )
}
export default Home
