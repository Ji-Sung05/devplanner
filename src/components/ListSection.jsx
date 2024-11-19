import React, { useState } from 'react'
import EditableTable from '../components/EditableTable';
import { FaPlus } from "react-icons/fa6";
import NewRow from './NewRow';

const ListSection = ({ data, title, $addWork, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeOpen = () => {
    setIsOpen(false);
  }
  return (
    <section id='listSection'>
      <h2>{title}</h2>
      <EditableTable rows={data} />
      {$addWork ? (
        <>
          <div onClick={() => setIsOpen(!isOpen)}>
            <FaPlus />
            <span>작업 추가</span>
          </div>
          {isOpen ? (
            <NewRow id={id} closeOpen={closeOpen} />
          ) : null}
        </>
      ) : null}
    </section>
  )
}

export default ListSection