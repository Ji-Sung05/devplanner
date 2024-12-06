import React from 'react'
//Toast 라이브러리
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//컴포넌트
import TodoContainer from '../components/TodoContainer'
import CalendarCard from '../components/CalendarCard'
//api
import { useFetchTodosQuery } from '../app/todoSlice';

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