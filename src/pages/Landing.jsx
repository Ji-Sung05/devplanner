import React from 'react'
import TodoContainer from '../components/TodoContainer'
import CalendarCard from '../components/CalendarCard'
import { useFetchTodosQuery } from '../app/todoSlice';

const Landing = () => {
  const { data: tasks = [] } = useFetchTodosQuery();
  return (
    <section id='landing'>
      <div className='landing__inner'>
        <TodoContainer tasks={tasks} />
        <CalendarCard tasks={tasks} />
      </div>
    </section>
  )
}

export default Landing