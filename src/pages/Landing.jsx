import React from 'react'
import TodoContainer from '../components/TodoContainer'
import CalendarCard from '../components/CalendarCard'
import { useFetchTodosQuery } from '../app/todoSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {
  const { data: tasks = [] } = useFetchTodosQuery();
  
  return (
    <section id='landing'>
      <div className='landing__inner'>
        <TodoContainer tasks={tasks} />
        <CalendarCard tasks={tasks} />
      </div>
      <ToastContainer 
        position='bottom-right'
        theme='light'
        autoClose={1500}
      />
    </section>
  )
}

export default Landing