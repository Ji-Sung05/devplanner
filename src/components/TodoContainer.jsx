import React from 'react';
//컴포넌트
import TodoRow from './TodoRow';
//api
import { useDeleteTodoMutation } from '../app/todoSlice';
//Toast 라이브러리
import { toast } from 'react-toastify';

const TodoContainer = ({ tasks }) => {  
  const [deleteTodo] = useDeleteTodoMutation(); 

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap(); 
      toast('작업이 삭제되었습니다!')
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
