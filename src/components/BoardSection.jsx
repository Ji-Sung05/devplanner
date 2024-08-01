import React from 'react'
import Card from './UI/Card'
import { FaPlus } from "react-icons/fa6";


const BoardSection = ({title, data, $addWork, plus}) => {
  
  return (
    <section className='board__section'>
      <h2>{title}</h2>
      <div className='card__container'>
        {data.length > 0 ? (
          data.map((item) => (
            <Card item={item} key={item.taskId} />
          ))
        ) : null}
        {$addWork ? (
        <div className='card__addwork' onClick={plus ? plus : null}>
          <FaPlus />
          <span>작업 추가</span>
        </div>
      ) : null}
      </div>
    </section>
  )
}

export default BoardSection