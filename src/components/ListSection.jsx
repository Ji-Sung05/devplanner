import React, { useState } from "react";
//아이콘
import { FaPlus } from "react-icons/fa6";
//컴포넌트
import EditRow from "./EditRow";
import NewRow from "./NewRow";

const ListSection = ({ data, title, isAddWork }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeOpen = () => {
    setIsOpen(false);
  };
  return (
    <section id="listSection">
      <h2>{title}</h2>
      <table className="table__body">
        <tbody>
          {data.map((row) => (
            <EditRow key={row.taskId} row={row} />
          ))}
        </tbody>
      </table>
      {isAddWork && (
        <>
          {isOpen && <NewRow closeOpen={closeOpen} />}
          <div onClick={() => setIsOpen(!isOpen)}>
            <FaPlus />
            <span>작업 추가</span>
          </div>
        </>
      )}
    </section>
  );
};

export default ListSection;
