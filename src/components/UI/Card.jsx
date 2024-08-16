import React, { useContext, useState } from 'react'
import { actionContext } from '../../pages/Work';
import { FaRegCheckCircle } from "react-icons/fa";

const Card = ({ item }) => {
  const { edit, add, update, updateStatus, deleteTask } = useContext(actionContext);
  
  const [isOption, setIsOption] = useState(false)

  const toggleOption = () => {
    setIsOption(prevState => !prevState);
  };

  return (
    <div id='card' onClick={() => updateStatus(item.taskId, item.status)}>
      <div className='card__inner'>
        <div className='card__top'>
          <div className='option'>
            <span onClick={toggleOption}>:</span>
            {
              isOption && (
                <ul>
                  <li value="update" onClick={() => update(item.taskId)}>수정하기</li>
                  <li value="delete" onClick={() => deleteTask(item.taskId)}>삭제하기</li>
                  <li value="move" onClick={() => updateStatus(item.taskId, item.status)}>완료</li>
                </ul>
              )
            }
          </div>
          <div>
            <FaRegCheckCircle onClick={() => add(item.taskId)} />
            <input type="text" value={item.todo} onChange={(e) => edit(item.taskId, 'todo', e.target.value)} />
          </div>
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