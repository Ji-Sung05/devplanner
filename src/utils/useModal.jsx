import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateTodoMutation } from '../app/todoSlice';

const useModal = (events, setEvents) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //새로 추가할 이벤트의 제목과 날짜 범위
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [createTodo] = useCreateTodoMutation();

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: '', start, end });
    setModalIsOpen(true);
  };

  const handleAddEvent = async () => {
    try {
      const bgColor = getRandomColor()
      const newTodo = await createTodo({
        todo: newEvent.title,
        startDate: newEvent.start,
        endDate: newEvent.end,
      }).unwrap();
      toast('작업이 생성되었습니다!')
      setEvents([...events, { ...newEvent, title: newEvent.title, id: newTodo.id, bgColor }]);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const closeModal = () => setModalIsOpen(false)

  return {
    modalIsOpen,
    newEvent,
    setNewEvent,
    handleSelectSlot,
    handleAddEvent,
    closeModal,
  }
}

const getRandomColor = () => {
  const letters = '123456789ABCDEF'
  let color = '#'
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default useModal