import React, { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
//Toast 라이브러리
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//api
import {
  useAddTaskMutation,
  useDeleteTasksMutation,
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from "../app/project";
//pages
import Home from "./Home";
//components
import BoardContainer from "../components/BoardContainer";
import Commit from "../components/Commit";
import TableHeader from "../components/TableHeader";
import ListContainer from "./../components/ListContainer";

export const actionContext = createContext();

const Work = () => {
  //작업 추가를 누르면 입력 폼이 생기게 한다.
  const location = useLocation();
  const { id, name, org } = location.state;

  const [category, setCategory] = useState("");

  // 여기서는 useFetchTasksQuery에서 가공된 데이터를 바로 사용
  const { data: tasks = [] } = useFetchTasksQuery(id, {
    skip: !id,
  });
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTasksMutation();

  // 서버 상태를 가지고와서 로컬 상태로 초기화 해주는 거 같음.
  // 서버 상태를 로컬 상태와 동기화 해서. 사용해야 할까?
  // 만약 꼭 초기화를 해야 한다면 useState의 초기값을 서버 상태로 설정해주는 것이 좋을 것 같다.

  const todo = tasks.filter((task) => {
    return task.status === "To Do";
  });

  const inprogress = tasks.filter((task) => {
    return task.status === "In Progress";
  });

  const done = tasks.filter((task) => {
    return task.status === "Done";
  });

  let doneLength = done.length;

  // 동작 로직
  const actions = {
    edit: async (taskId, field, value) => {
      const taskToEdit = tasks.find((task) => task.taskId === taskId);
      if (taskToEdit) {
        const updatedTask = { ...taskToEdit, [field]: value };
        await updateTask({
          projectId: id,
          taskId,
          task: updatedTask,
        }).unwrap();
        toast("작업이 성공적으로 수정되었습니다!");
      }
    },
    add: async (newTask) => {
      try {
        await addTask({ projectId: id, task: newTask }).unwrap();
        toast("작업이 성공적으로 추가되었습니다!");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("작업 추가를 실패했습니다.");
      }
    },
    updateStatus: async (taskId, status) => {
      const taskToUpdate = tasks.find((task) => task.taskId === taskId);
      if (!taskToUpdate) return;

      let newStatus;
      if (status === "To Do") newStatus = "In Progress";
      else if (status === "In Progress") newStatus = "Done";
      else return;

      const updatedTask = { ...taskToUpdate, status: newStatus };
      try {
        await updateTask({
          projectId: id,
          taskId,
          task: updatedTask,
        }).unwrap();
        toast.info("작업 상태가 변경되었습니다!");
      } catch (error) {
        console.error("Error updating task status:", error);
        toast.error("작업 상태 변경에 실패했습니다.");
      }
    },
    deleteTask: async (taskId) => {
      try {
        await deleteTask({ projectId: id, taskId }).unwrap();
        toast.info("작업이 성공적으로 삭제되었습니다!");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("작업 삭제를 실패했습니다.");
      }
    },
  };
  
  return (
    <Home>
      <div className="work__top">
        <p>{name}</p>
        <select
          name="options"
          id="options"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">목록 ▼</option>
          <option value="list">list</option>
          <option value="board">board</option>
          <option value="commit">commit</option>
        </select>
      </div>
      <div className={`work__inner ${category === "commit" ? "no-gap" : ""}`}>
        <actionContext.Provider value={actions}>
          <TableHeader doneLength={doneLength} category={category} />
          {category === "" || category === "list" ? (
            <ListContainer
              todo={todo}
              inprogress={inprogress}
              done={done}
              id={id}
            />
          ) : category === "board" ? (
            <BoardContainer
              todo={todo}
              inprogress={inprogress}
              done={done}
              id={id}
            />
          ) : category === "commit" ? (
            <Commit repoName={name} orgName={org} />
          ) : null}
        </actionContext.Provider>
      </div>
      <ToastContainer position="bottom-right" theme="light" autoClose={1500} />
    </Home>
  );
};

export default Work;
