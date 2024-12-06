import React, { useState } from "react";
//Toast 라이브러리
import { toast } from "react-toastify";
//아이콘
import { FaRegCheckCircle } from "react-icons/fa";
//api
import { useAddTaskMutation, useFetchTasksQuery } from "../app/project";
import { useLocation } from "react-router-dom";

const NewRow = ({ closeOpen }) => {
  const location = useLocation();
  const projectId = location.state?.id;
  //tasks에서 마지막 Id를 가져오기 위해 fetch
  const { data: tasks = [], isLoading } = useFetchTasksQuery(projectId, {
    skip: !projectId,
  });

  const [addTask] = useAddTaskMutation();

  const [taskData, setTaskData] = useState({
    taskId:
      tasks.tasks.reduce((acc, task) => Math.max(acc, task.taskId), 0) + 1,
    todo: "",
    worker: "",
    date: "",
    content: "",
    status: "To Do",
  });

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  const handleAddTask = async () => {
    try {
      await addTask({ projectId: projectId, task: taskData }).unwrap();
      toast("작업이 성공적으로 추가되었습니다!");
      closeOpen();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("작업 추가를 실패했습니다.");
    }
  };

  return (
    <table className="table__body">
      <tbody>
        <tr>
          <td>
            <div>
              <FaRegCheckCircle color="white" onClick={handleAddTask} />
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
              value={taskData.date}
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
