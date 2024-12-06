import React, { useState } from "react";
import { useLocation } from "react-router-dom";
//Toast 라이브러리
import { toast } from "react-toastify";
//api
import {
  useDeleteTasksMutation,
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from "../app/project";
import { toLocalDateFormat } from "../utils/dateUtils";

const EditBoard = ({ item }) => {
  const location = useLocation();
  const projectId = location.state?.id;

  const [isOption, setIsOption] = useState(false);
  const toggleOption = () => setIsOption((prev) => !prev);

  //To Do 데이터 가져오기
  const { data: tasks = [], isLoading } = useFetchTasksQuery(projectId, {
    skip: !projectId,
  });

  const [deleteTask] = useDeleteTasksMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [taskData, setTaskData] = useState({
    todo: item.todo || "",
    worker: item.worker || "",
    date: toLocalDateFormat(item.date),
    content: item.content || "",
  });

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  // 공통 작업 실행 함수
  const executeTaskAction = async (action, message, payload) => {
    try {
      await action(payload).unwrap();
      toast(message.success);
    } catch (error) {
      console.error(message.error, error);
      toast.error(message.error);
    }
  };
  // 작업 수정
  const updateHandler = (taskId) => {
    executeTaskAction(
      updateTask,
      {
        success: "작업이 성공적으로 수정되었습니다!",
        error: "작업 수정을 실패했습니다!",
      },
      { projectId, taskId, task: taskData }
    );
    setIsOption(false);
  };
  //작업 상태 변경
  const updateStatusHandler = (taskId, status) => {
    const taskToUpdate = tasks.todo.find((task) => task.taskId === taskId);
    if (!taskToUpdate) return;

    const newStatus = (() => {
      if (status === "To Do") return "In Progress";
      if (status === "In Progress") return "Done";
      return null; // 상태 변경 없음
    })();
    if (!newStatus) return;

    const updatedTask = { ...taskToUpdate, status: newStatus };
    executeTaskAction(
      updateTask,
      {
        success: "작업 상태가 변경되었습니다!",
        error: "작업 상태 변경에 실패했습니다.",
      },
      { projectId, taskId, task: updatedTask }
    );
  };
  // 작업 삭제
  const deleteHandler = (taskId) => {
    executeTaskAction(
      deleteTask,
      {
        success: "작업이 성공적으로 삭제되었습니다!",
        error: "작업 삭제를 실패했습니다.",
      },
      { projectId, taskId }
    );
  };
  // 입력 필드 값 변경 핸들러
  const handleChange = (field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div id="card">
      <div className="card__inner">
        <div className="card__top">
          <div className="option">
            <span onClick={toggleOption}>:</span>
            {isOption && (
              <ul>
                <li onClick={() => updateHandler(item.taskId)}>수정하기</li>
                <li onClick={() => deleteHandler(item.taskId)}>삭제하기</li>
                <li
                  onClick={() => updateStatusHandler(item.taskId, item.status)}
                >
                  완료
                </li>
              </ul>
            )}
          </div>
          <div>
            <input
              type="text"
              value={taskData.todo}
              onChange={(e) => handleChange("todo", e.target.value)}
            />
          </div>
        </div>
        <div className="card__middle">
          <input
            type="text"
            value={taskData.worker}
            onChange={(e) => handleChange("worker", e.target.value)}
          />
          <input
            type="date"
            value={taskData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
        <div className="card__bottom">
          <input
            type="text"
            value={taskData.content}
            onChange={(e) => handleChange("content", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
