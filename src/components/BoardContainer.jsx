import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// 아이콘
import { GoPlusCircle } from "react-icons/go";
// api
import { useFetchTasksQuery } from "../app/project";
//컴포넌트
import NewBoard from "./NewBoard";
import EditBoard from "./EditBoard";

const BoardContainer = () => {
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
    <div id="boardcontainer">
      <section className="board__section">
        <div className="card__container">
          <h3>할일</h3>
          {todo.map((item) => (
            <EditBoard item={item} key={item.taskId} />
          ))}
          {isOpen && <NewBoard closeOpen={closeOpen} />}
          <div className="card__addwork" onClick={() => setIsOpen(!isOpen)}>
            <GoPlusCircle size={28} />
          </div>
        </div>
      </section>
      <section className="board__section">
        <div className="card__container">
          <h3>진행중</h3>
          {inprogress.map((item) => (
            <EditBoard item={item} key={item.taskId} />
          ))}
        </div>
      </section>
      <section className="board__section">
        <div className="card__container">
          <h3>작업 완료</h3>
          {done.map((item) => (
            <EditBoard item={item} key={item.taskId} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BoardContainer;
