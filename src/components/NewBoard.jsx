import React, { useContext, useState } from "react";
import { actionContext } from "../pages/Work";
//아이콘
import { FaRegCheckCircle } from "react-icons/fa";
//api
import { useFetchTasksQuery } from "../app/project";

const NewBoard = ({ id, closeOpen }) => {
  const { add } = useContext(actionContext);
  //tasks에서 마지막 Id를 가져오기 위해 fetch
  const { data: tasks = [] } = useFetchTasksQuery(id, {
    skip: !id,
  });

  //reduce를 통해 최대 Id 값 + 1 -> 배열 한 번 순회
  function getNextTaskId() {
    return tasks.length !== 0
      ? tasks.reduce((maxId, task) => Math.max(maxId, task.taskId), 0) + 1
      : 1;
  }

  const [taskData, setTaskData] = useState({
    taskId: getNextTaskId(),
    todo: "",
    worker: "",
    date: "",
    content: "",
    status: "To Do",
  });

  const handleAddTask = () => {
    // 데이터 검증 추가 (예: 필수 필드 확인)
    if (
      !taskData.todo ||
      !taskData.worker ||
      !taskData.date ||
      !taskData.content
    ) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    add(taskData);
    closeOpen();
  };

  return (
    <div id="card">
      <div className="card__inner">
        <div className="card__top">
          <FaRegCheckCircle
            style={{ cursor: "pointer" }}
            onClick={handleAddTask}
          />
          <input
            type="text"
            value={taskData.todo}
            onChange={(e) => setTaskData({ ...taskData, todo: e.target.value })}
          />
        </div>
        <div className="card__middle">
          <input
            type="text"
            value={taskData.worker}
            onChange={(e) =>
              setTaskData({ ...taskData, worker: e.target.value })
            }
          />
          <input
            type="date"
            value={taskData.date}
            onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
          />
        </div>
        <div className="card__bottom">
          <input
            type="text"
            value={taskData.content}
            onChange={(e) =>
              setTaskData({ ...taskData, content: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewBoard;
