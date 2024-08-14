import React from 'react'
import Card from './UI/Card'
import { GoPlusCircle } from "react-icons/go";


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
          <GoPlusCircle size={28} />
        </div>
      ) : null}
      </div>
    </section>
  )
}

export default BoardSection