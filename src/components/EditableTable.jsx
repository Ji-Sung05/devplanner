import React from 'react';
import EditRow from './EditRow';

const EditableTable = ({ rows }) => {
  
  return (
    <table className='table__body'>
      <tbody>
        {rows.map((row) => (
          <EditRow key={row.taskId} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
