import React, { useState } from "react";
//아이콘
import { GoPlusCircle } from "react-icons/go";
//컴포넌트
import Card from "./UI/Card";
import NewBoard from "./NewBoard";

const BoardSection = ({ title, data, isAddWork, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeOpen = () => {
    setIsOpen(false);
  };
  return (
    <section className="board__section">
      <div className="card__container">
        <h3>{title}</h3>
        {data.length > 0
          ? data.map((item) => <Card item={item} key={item.taskId} />)
          : null}
        {isAddWork ? (
          <>
            {isOpen && <NewBoard id={id} closeOpen={closeOpen} />}
            <div className="card__addwork" onClick={() => setIsOpen(!isOpen)}>
              <GoPlusCircle size={28} />
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default BoardSection;
