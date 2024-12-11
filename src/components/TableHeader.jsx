import React from "react";
import { useLocation } from "react-router-dom";
//api
import { useFetchTasksQuery } from "../app/project";

const TableHeader = ({ category }) => {
  const location = useLocation();
  const { id } = location.state;

  // 여기서는 useFetchTasksQuery에서 가공된 데이터를 바로 사용
  //id가 null, undefined이면 !id가 참이 되어 건너뛰게 된다. ->  불필요한 요청을 건너뛰게 함
  const { data: tasks = [], isLoading } = useFetchTasksQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  const doneLength = tasks.done.length;
  return (
    <table className="table__header">
      <thead>
        <tr>
          {category === "" || category === "list" ? (
            <>
              <th>오늘 {doneLength}개의 작업 완료됨</th>
              <th>담당자</th>
              <th>마감일</th>
              <th>기능</th>
            </>
          ) : category === "board" ? (
            <>
              <th className="board__th">오늘 {doneLength}개의 작업 완료됨</th>
            </>
          ) : null}
        </tr>
      </thead>
    </table>
  );
};

export default TableHeader;
