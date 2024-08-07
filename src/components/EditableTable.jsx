import React, { useContext } from 'react';
import { actionContext } from '../pages/Work';
import { FaRegCheckCircle } from "react-icons/fa";

const EditableTable = ({ rows }) => {
  const { edit, add, update, updateStatus } = useContext(actionContext);
  return (
    <table className='table__body'>
      <tbody>
        {rows.map((row) => (
          <tr key={row.taskId}>
            <td>
              <div>
                <span onClick={() => update(row.taskId)} className='update'>:</span>
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
                <span className='move' onClick={() => updateStatus(row.taskId, row.status)}>⇩</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;