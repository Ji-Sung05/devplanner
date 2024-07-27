import React from 'react'

const TableHeader = () => {
  return (
    <table className='table__header'>
      <thead>
        <tr>
          <th>오늘 1개의 작업 완료됨</th>
          <th>담당자</th>
          <th>마감일</th>
          <th>기능</th>
        </tr>
      </thead>
    </table>
  )
}

export default TableHeader