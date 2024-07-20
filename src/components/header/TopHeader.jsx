import React from 'react'
import { FaGithub } from "react-icons/fa6";

const TopHeader = () => {
  return (
    <div className='topHeader'>
      <FaGithub className='main-logo' color='white' />
      <span className='main-title'>DevPlan</span>
    </div>
  )
}

export default TopHeader