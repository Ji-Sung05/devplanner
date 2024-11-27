import React from "react";
import ListSection from "./ListSection";

const ListContainer = ({ todo, inprogress, done }) => {
  return (
    <div id="listcontainer">
      <ListSection title={"할 일"} data={todo} isAddWork />
      <ListSection title={"진행중"} data={inprogress} />
      <ListSection title={"작업 완료"} data={done} />
    </div>
  );
};

export default ListContainer;
