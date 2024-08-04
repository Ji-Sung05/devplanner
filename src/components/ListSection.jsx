import React from 'react'
import EditableTable from '../components/EditableTable';
import { FaPlus } from "react-icons/fa6";

const ListSection = ({ data, title, $addWork, plus }) => {
  return (
    <section id='listSection'>
      <h2>{title}</h2>
      <EditableTable rows={data} />
      {$addWork ? (
        <div onClick={plus ? plus : null}>
          <FaPlus />
          <span>작업 추가</span>
        </div>
      ) : null}
    </section>
  )
}

export default ListSection