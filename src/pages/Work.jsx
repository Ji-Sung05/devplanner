import React from 'react'
import Home from './Home'
import { useLocation } from 'react-router-dom'

const Work = () => {
  const location = useLocation()
  const id = location.state?.id
  return (
    <Home>Work</Home>
  )
}

export default Work