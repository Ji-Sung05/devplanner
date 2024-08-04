import React from 'react'
import TodoContainer from '../components/TodoContainer'
import CalendarCard from '../components/CalendarCard'

const Landing = () => {
  
  return (
    <section id='landing'>
      <div className='landing__inner'>
        <TodoContainer />
        <CalendarCard />
      </div>
    </section>
  )
}

export default Landing