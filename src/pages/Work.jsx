import React, { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const location = useLocation();
  const { id, name, org } = location.state;
  // rows 상태를 선언했지만 렌더링하는 부분에는 사용하지 않음
  // state를 사용하는 이유는 -> state가 변경되면 리렌더링이 일어남 -> 사용자가 보는 화면이 변경됌
  // rosw가 꼭 필요한 상태인지 확인을 해보면 좋을 거 같습니다.
  const [rows, setRows] = useState([]);

  const [currentId, setCurrentId] = useState(1);
  const [category, setCategory] = useState("");

  const plusCurrentId = () => {
    setCurrentId(currentId + 1);
  };

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
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setRows(
        tasks.map((task) => ({
          ...task,
          date: task.date ? task.date.split("T")[0] : "",
        }))
      );
      const maxId = Math.max(...tasks.map((task) => task.taskId), currentId);
      setCurrentId(maxId + 1);
    }
  }, [tasks]);

  const todo = rows.filter((row) => {
    return row.status === "To Do";
  });

  const inprogress = rows.filter((row) => {
    return row.status === "In Progress";
  });

  const done = rows.filter((row) => {
    return row.status === "Done";
  });

  let doneLength = done.length;

  const handleAddWork = async () => {
    const newRow = {
      taskId: currentId,
      todo: "", // 초기값
      worker: "",
      date: "",
      content: "",
      status: "To Do",
    };
    setRows((prevRows) => [...prevRows, newRow]);
    plusCurrentId();
  };

  // 불필요한 useMemo 제거
  const actions = useMemo(
    () => ({
      edit: async (rowId, field, value) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.taskId === rowId ? { ...row, [field]: value } : row
          )
        );
      },
      add: async (rowId) => {
        const newTask = rows.find((row) => row.taskId === rowId);
        const newTodo = {
          taskId: newTask.taskId,
          todo: newTask.todo,
          worker: newTask.worker,
          date: newTask.date,
          content: newTask.content,
        };
        try {
          await addTask({ projectId: id, task: newTodo }).unwrap();
          toast("작업이 성공적으로 저장되었습니다!");
        } catch (error) {
          console.error("Error saving task:", error);
          toast.error("작업 저장을 실패했습니다.");
        }
      },
      update: async (rowId) => {
        const update = rows.find((row) => row.taskId === rowId);
        const updateTodo = {
          todo: update.todo,
          worker: update.worker,
          date: update.date,
          content: update.content,
        };
        try {
          await updateTask({
            projectId: id,
            taskId: rowId,
            task: updateTodo,
          }).unwrap();
          toast("작업이 성공적으로 수정되었습니다!");
        } catch (error) {
          console.error("Error saving task:", error);
          toast.error("작업 수정을 실패했습니다.");
        }
      },
      updateStatus: async (rowId, status) => {
        const update = rows.find((row) => row.taskId === rowId);

        let newStatus;
        if (status === "To Do") {
          newStatus = "In Progress";
        } else if (status === "In Progress") {
          newStatus = "Done";
        } else if (status === "Done") {
          return;
        }

        const updateTodo = {
          todo: update.todo,
          worker: update.worker,
          date: update.date,
          content: update.content,
          status: newStatus,
        };
        try {
          await updateTask({
            projectId: id,
            taskId: rowId,
            task: updateTodo,
          }).unwrap();
          toast.info("작업을 완료했습니다!");
        } catch (error) {
          console.error("Error saving task:", error);
          toast.error("작업 완료를 실패했습니다.");
        }
      },
      deleteTask: async (rowId) => {
        try {
          await deleteTask({ projectId: id, taskId: rowId }).unwrap();
          toast.info("작업을 성공적으로 삭제했습니다!");
        } catch (error) {
          console.error("Error delete task:", error);
          toast.error("작업 삭제를 실패했습니다.");
        }
      },
    }),
    [rows, id, addTask, updateTask, deleteTask]
  );

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
              addWork={handleAddWork}
            />
          ) : category === "board" ? (
            <BoardContainer
              todo={todo}
              inprogress={inprogress}
              done={done}
              addWork={handleAddWork}
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
