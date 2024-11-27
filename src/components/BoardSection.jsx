import React, { useState } from "react";
//아이콘
import { GoPlusCircle } from "react-icons/go";
//컴포넌트
import NewBoard from "./NewBoard";
import EditBoard from "./EditBoard";

const BoardSection = ({ title, data, isAddWork }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeOpen = () => {
    setIsOpen(false);
  };
  return (
    <section className="board__section">
      <div className="card__container">
        <h3>{title}</h3>
        {data.length > 0
          ? data.map((item) => <EditBoard item={item} key={item.taskId} />)
          : null}
        {isAddWork ? (
          <>
            {isOpen && <NewBoard closeOpen={closeOpen} />}
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
