import React from 'react'
import BoardSection from './BoardSection'

const BoardContainer = ({ todo, inprogress, done, addWork }) => {

  return (
    <div id='boardcontainer'>
      <BoardSection title={'할 일'} data={todo} $addWork={true} plus={addWork} />
      <BoardSection title={'진행중'} data={inprogress} $addWork={false} />
      <BoardSection title={'작업 완료'} data={done} $addWork={false} />
    </div>
  )
}

export default BoardContainer