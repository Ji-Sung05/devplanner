import React from 'react'
import ListSection from './ListSection'

const ListContainer = ({ todo, inprogress, done, id }) => {
  return (
    <div id='listcontainer'>
      <ListSection title={'할 일'} data={todo} $addWork={true} id={id} />
      <ListSection title={'진행중'} data={inprogress} />
      <ListSection title={'작업 완료'} data={done} />
    </div>
  )
}

export default ListContainer