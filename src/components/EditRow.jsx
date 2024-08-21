import React, { useContext, useState } from 'react'
import { actionContext } from '../pages/Work';
import { FaRegCheckCircle } from "react-icons/fa";

const EditRow = ({ row }) => {
  const { edit, add, update, updateStatus, deleteTask } = useContext(actionContext);
  const [isOption, setIsOption] = useState(false)

  const toggleOption = () => {
    setIsOption(prevState => !prevState);
  };

  const updateHandler = (taskId) => {
    update(taskId)
    setIsOption(false)
  }

  return (
    <tr>
      <td>
        <div>
          <div className='option'>
            <span onClick={toggleOption}>:</span>
            {
              isOption && (
                <ul>
                  <li value="update" onClick={() => updateHandler(row.taskId)}>수정하기</li>
                  <li value="delete" onClick={() => deleteTask(row.taskId)}>삭제하기</li>
                  <li value="move" onClick={() => updateStatus(row.taskId, row.status)}>완료</li>
                </ul>
              )
            }
          </div>
          <FaRegCheckCircle color='white' onClick={() => add(row.taskId)} />
          <input
            type="text"
            value={row.todo}
            onChange={(e) => edit(row.taskId, 'todo', e.target.value)}
          />
        </div>
      </td>
      <td>
        <input
          type="text"
          className='input2'
          value={row.worker}
          onChange={(e) => edit(row.taskId, 'worker', e.target.value)}
        />
      </td>
      <td>
        <input
          type="date"
          className='input3'
          value={row.date}
          onChange={(e) => edit(row.taskId, 'date', e.target.value)}
        />
      </td>
      <td>
        <div>
          <input
            type="text"
            value={row.content}
            onChange={(e) => edit(row.taskId, 'content', e.target.value)}
          />
        </div>
      </td>
    </tr>
  )
}

export default EditRow