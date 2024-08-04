import React, { useState } from 'react';
import { useDeleteTodoMutation, useFetchTodosQuery } from '../app/todoSlice';
import TodoRow from './TodoRow';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  
  const { data: tasks = [] } = useFetchTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation(); 

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap(); 
      setTodos(todos.filter(todo => todo._id !== id)); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div id='todocontainer'>
      <div className='todocontainer__inner'>
        <span>할 일</span>
        {tasks.map(todo => (
          <TodoRow key={todo.id} data={todo} del={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default TodoContainer;
