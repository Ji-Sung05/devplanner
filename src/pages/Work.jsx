import React from 'react';
import Home from './Home';
import { useLocation } from 'react-router-dom';
import TodoSection from '../components/TodoSection';
import TableHeader from '../components/TableHeader';

const Work = () => {
  const location = useLocation();
  const id = location.state?.id;
  return (
    <Home>
      <div className='work__top'>
        <p>client</p>
        <select name="options" id="options">
          <option value="">목록 ▼</option>
          <option value="list">list</option>
          <option value="board">board</option>
          <option value="chat">chat</option>
        </select>
      </div>
      <div className='work__inner'>
        <TableHeader />
        <TodoSection title={'할 일'} projectId={id} $addWork={true} />
        <TodoSection title={'진행중'} $addWork={false} />
        <TodoSection title={'작업 완료'} $addWork={false} />
      </div>
    </Home>
  );
};

export default Work;
