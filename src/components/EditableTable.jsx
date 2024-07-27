import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa";

const EditableTable = ({ rows, onEditCell, onSave }) => {
  return (
    <table className='table__body'>
      <tbody>
        {rows.map((row) => (
          <tr key={row._id}>
            <td>
              <div>
                <FaRegCheckCircle color='white' onClick={() => onSave(row._id)} />
                <input
                  type="text"
                  value={row.todo}
                  onChange={(e) => onEditCell(row._id, 'todo', e.target.value)}
                />
              </div>
            </td>
            <td>
              <input
                type="text"
                className='input2'
                value={row.worker}
                onChange={(e) => onEditCell(row._id, 'worker', e.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                className='input3'
                value={row.date}
                onChange={(e) => onEditCell(row._id, 'date', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.content}
                onChange={(e) => onEditCell(row._id, 'content', e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
