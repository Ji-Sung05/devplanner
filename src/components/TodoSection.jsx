import React from 'react'
import EditableTable from '../components/EditableTable';
import { FaPlus } from "react-icons/fa6";

const TodoSection = ({ data, title, $addWork, handleAddWork, handleEditCell, updateTodoHandler, AddTodoHandler, updateStatusHandler }) => {
  return (
    <section id='todocontainer'>
      <h2>{title}</h2>
      <EditableTable rows={data} onEditCell={handleEditCell} onAdd={AddTodoHandler} onUpdate={updateTodoHandler} onStatus={updateStatusHandler} />
      {$addWork ? (
        <div onClick={handleAddWork} >
          <FaPlus />
          <span>작업 추가</span>
        </div>
      ) : null}
    </section>
  )
}

export default TodoSection