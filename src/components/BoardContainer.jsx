import React from "react";
import BoardSection from "./BoardSection";

const BoardContainer = ({ todo, inprogress, done }) => {
  return (
    <div id="boardcontainer">
      <BoardSection title={"할 일"} data={todo} isAddWork />
      <BoardSection title={"진행중"} data={inprogress} isAddwork={false} />
      <BoardSection title={"작업 완료"} data={done} isAddWork={false} />
    </div>
  );
};

export default BoardContainer;
