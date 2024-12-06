import React, { useState } from "react";
import { useLocation } from "react-router-dom";
//Toast 라이브러리
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//api
import { useFetchTasksQuery } from "../app/project";
//pages
import Home from "./Home";
//components
import BoardContainer from "../components/BoardContainer";
import Commit from "../components/Commit";
import TableHeader from "../components/TableHeader";
import ListContainer from "./../components/ListContainer";

const Work = () => {
  const location = useLocation();
  const { id, name, org } = location.state;

  const [category, setCategory] = useState("");

  // 여기서는 useFetchTasksQuery에서 가공된 데이터를 바로 사용
  const { data: tasks = [], isLoading } = useFetchTasksQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  const doneLength = tasks.done.length;

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
        <TableHeader doneLength={doneLength} category={category} />
        {category === "" || category === "list" ? (
          <ListContainer />
        ) : category === "board" ? (
          <BoardContainer />
        ) : category === "commit" ? (
          <Commit repoName={name} orgName={org} />
        ) : null}
      </div>
      <ToastContainer position="bottom-right" theme="light" autoClose={1500} />
    </Home>
  );
};

export default Work;
