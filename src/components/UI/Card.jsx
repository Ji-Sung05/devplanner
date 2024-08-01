import React, { useContext } from 'react'
import { actionContext } from '../../pages/Work';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

const Card = ({ item }) => {
  const { edit, add, update, updateStatus } = useContext(actionContext);
  return (
    <div id='card' onClick={() => updateStatus(item.taskId, item.status)}>
      <div className='card__inner'>
        <div className='card__top'>
          <div>
            <FaRegCheckCircle onClick={() => add(item.taskId)} />
            <input type="text" value={item.todo} onChange={(e) => edit(item.taskId, 'todo', e.target.value)} />
          </div>
          <FaPencilAlt onClick={() => update(item.taskId)} />
        </div>
        <div className='card__middle'>
          <input type="text" value={item.worker} onChange={(e) => edit(item.taskId, 'worker', e.target.value)} />
          <input type="date" value={item.date} onChange={(e) => edit(item.taskId, 'date', e.target.value)} />
        </div>
        <div className='card__bottom'>
          <input type="text" value={item.content} onChange={(e) => edit(item.taskId, 'content', e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default Card