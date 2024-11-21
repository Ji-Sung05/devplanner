import React, { useState } from 'react'
import Card from './UI/Card'
import { GoPlusCircle } from "react-icons/go";
import NewBoard from './NewBoard';


const BoardSection = ({title, data, $addWork, id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeOpen = () => {
    setIsOpen(false);
  }
  return (
    <section className='board__section'>
      <div className='card__container'>
        <h3>{title}</h3>
        {data.length > 0 ? (
          data.map((item) => (
            <Card item={item} key={item.taskId} />
          ))
        ) : null}
        {$addWork ? (
        <>
        {isOpen ? (
            <NewBoard id={id} closeOpen={closeOpen} />
          ) : null}
          <div 
            className='card__addwork' 
            onClick={() => setIsOpen(!isOpen)}
          >
            <GoPlusCircle size={28} />
          </div>
        </>
      ) : null}
      </div>
    </section>
  )
}

export default BoardSection