import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa";

const EditableTable = ({ rows, onEditCell, onAdd, onUpdate, onStatus }) => {

  return (
    <table className='table__body'>
      <tbody>
        {rows.map((row) => (
          <tr key={row.taskId}>
            <td>
              <div>
                <span onClick={() => onUpdate(row.taskId)} className='update'>:</span>
                <FaRegCheckCircle color='white' onClick={() => onAdd(row.taskId)} />
                <input
                  type="text"
                  value={row.todo}
                  onChange={(e) => onEditCell(row.taskId, 'todo', e.target.value)}
                />
              </div>
            </td>
            <td>
              <input
                type="text"
                className='input2'
                value={row.worker}
                onChange={(e) => onEditCell(row.taskId, 'worker', e.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                className='input3'
                value={row.date}
                onChange={(e) => onEditCell(row.taskId, 'date', e.target.value)}
              />
            </td>
            <td>
              <div>
                <input
                  type="text"
                  value={row.content}
                  onChange={(e) => onEditCell(row.taskId, 'content', e.target.value)}
                />
                <span className='move' onClick={() => onStatus(row.taskId, row.status)}>⇩</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
