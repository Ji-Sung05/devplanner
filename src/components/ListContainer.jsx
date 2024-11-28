import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// 아이콘
import { FaPlus } from "react-icons/fa6";
// api
import { useFetchTasksQuery } from "../app/project";
// 컴포넌트
import EditRow from "./EditRow";
import NewRow from "./NewRow";

const ListContainer = () => {
  const location = useLocation();
  const projectId = location.state?.id;

  const { data: tasks = [] } = useFetchTasksQuery(projectId, {
    skip: !projectId,
  });

  const todo = tasks.filter((task) => {
    return task.status === "To Do";
  });

  const inprogress = tasks.filter((task) => {
    return task.status === "In Progress";
  });

  const done = tasks.filter((task) => {
    return task.status === "Done";
  });

  const [isOpen, setIsOpen] = useState(false);
  const closeOpen = () => {
    setIsOpen(false);
  };

  return (
    <div id="listcontainer">
      <section id="listSection">
        <h2>할 일</h2>
        <table className="table__body">
          <tbody>
            {todo.map((row) => (
              <EditRow key={row.taskId} row={row} />
            ))}
          </tbody>
        </table>
        {isOpen && <NewRow closeOpen={closeOpen} />}
        <div onClick={() => setIsOpen(!isOpen)}>
          <FaPlus />
          <span>작업 추가</span>
        </div>
      </section>
      <section id="listSection">
        <h2>진행중</h2>
        <table className="table__body">
          <tbody>
            {inprogress.map((row) => (
              <EditRow key={row.taskId} row={row} />
            ))}
          </tbody>
        </table>
      </section>
      <section id="listSection">
        <h2>작업 완료</h2>
        <table className="table__body">
          <tbody>
            {done.map((row) => (
              <EditRow key={row.taskId} row={row} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ListContainer;
