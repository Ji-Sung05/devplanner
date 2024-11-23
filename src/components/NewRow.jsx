import React, { useContext, useState } from "react";
import { actionContext } from "../pages/Work";
//아이콘
import { FaRegCheckCircle } from "react-icons/fa";
//api
import { useFetchTasksQuery } from "../app/project";

const formatDateForInput = (dateString) => {
  const date = new Date(dateString || new Date());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0"); // 두 자리로 맞춤
  return `${year}-${month}-${day}`; // yyyy-MM-dd 형식 반환
};

const NewRow = ({ id, closeOpen }) => {
  //데이터를 추가하는 함수
  const { add } = useContext(actionContext);
  //tasks에서 마지막 Id를 가져오기 위해 fetch
  const { data: tasks = [] } = useFetchTasksQuery(id, {
    skip: !id,
  });
  //마지막 taskId + 1
  const getNextTaskId = () =>
    tasks.length !== 0 ? Math.max(...tasks.map((task) => task.taskId)) + 1 : 1;

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
    <table>
      <tbody>
        <tr>
          <td>
            <div>
              <FaRegCheckCircle
                color="white"
                onClick={handleAddTask} // handleAddTask로 데이터 추가
              />
              <input
                type="text"
                placeholder="할 일 입력"
                value={taskData.todo}
                onChange={(e) =>
                  setTaskData({ ...taskData, todo: e.target.value })
                }
              />
            </div>
          </td>
          <td>
            <input
              type="text"
              className="input2"
              placeholder="담당자 입력"
              value={taskData.worker}
              onChange={(e) =>
                setTaskData({ ...taskData, worker: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="date"
              className="input3"
              value={taskData.date ? taskData.date : formatDateForInput()}
              onChange={(e) =>
                setTaskData({ ...taskData, date: e.target.value })
              }
            />
          </td>
          <td>
            <div>
              <input
                type="text"
                placeholder="내용 입력"
                value={taskData.content}
                onChange={(e) =>
                  setTaskData({ ...taskData, content: e.target.value })
                }
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NewRow;
