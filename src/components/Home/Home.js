import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Find Your Community Garden</h1>
      <h2>See what gardens people are talking about</h2>
      <Link to='/gardens'>
        <Button>View Gardens</Button>
      </Link>
      <h2>View all gardens</h2>
      <Link to='/all-gardens'>
        <Button>View All Gardens</Button>
      </Link>
    </div>
  )
}
export default Home
