import React, { useState } from "react";
import { useLocation } from "react-router-dom";
//Toast 라이브러리
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//pages
import Home from "./Home";
//components
import BoardContainer from "../components/BoardContainer";
import Commit from "../components/Commit";
import TableHeader from "../components/TableHeader";
import ListContainer from "./../components/ListContainer";

const Work = () => {
  const location = useLocation();
  const { name } = location.state;

  const [category, setCategory] = useState("");

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
        <TableHeader category={category} />
        {category === "" || category === "list" ? (
          <ListContainer />
        ) : category === "board" ? (
          <BoardContainer />
        ) : category === "commit" ? (
          <Commit repoName={name} />
        ) : null}
      </div>
      <ToastContainer position="bottom-right" theme="light" autoClose={1500} />
    </Home>
  );
};

export default Work;
