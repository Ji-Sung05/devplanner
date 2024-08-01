import React from 'react'

const TableHeader = ({ doneLength, category }) => {
  return (
    <table className='table__header'>
      <thead>
        <tr>
          {category === '' || category === 'list' ? (
            <>
            <th>오늘 {doneLength}개의 작업 완료됨</th>
            <th>담당자</th>
            <th>마감일</th>
            <th>기능</th>
            </>
          ) : category === 'board' ? (
            <>
            <th className='board__th'>오늘 {doneLength}개의 작업 완료됨</th>
            </>
          ) : null}
        </tr>
      </thead>
    </table>
  )
}

export default TableHeader