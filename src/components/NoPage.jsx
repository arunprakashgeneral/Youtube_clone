import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div>
      <h1>Page not found </h1>
      <Link to='/' className='text-blue-700 underline'>Return to Homepage</Link>
    </div>
  )
}

export default NoPage
