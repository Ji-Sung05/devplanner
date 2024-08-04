import React, { useState, useEffect } from 'react';
//날짜와 시간을 다루기 위한 라이브러리
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useCreateTodoMutation, useFetchTodosQuery } from '../app/todoSlice';

//momentLocalizer: moment.js를 캘리더의 날짜 형식에 맞게 로컬라이즈하는 역할 
const localizer = momentLocalizer(moment);

const CalendarCard = () => {
  //캘린더에 표시될 이벤트 목록
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //새로 추가할 이벤트의 제목과 날짜 범위
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const { data: tasks = [] } = useFetchTodosQuery();
  const [createTodo] = useCreateTodoMutation();

  //api 에서 가져온 데이터를 캘린더에 맞는 형식으로 변환하여 events 상태를 업데이트
  useEffect(() => {
    if (tasks.length > 0) {
      const formattedTasks = tasks.map(task => ({
        ...task,
        title: task.todo,
        start: new Date(task.startDate),
        end: new Date(task.endDate),
      }));
      setEvents(formattedTasks);
    }
  }, [tasks]);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: '', start, end });
    setModalIsOpen(true);
  };

  const handleAddEvent = async () => {
    try {
      const newTodo = await createTodo({
        todo: newEvent.title,
        startDate: newEvent.start,
        endDate: newEvent.end,
      }).unwrap();
      setEvents([...events, { ...newEvent, title: newEvent.title, id: newTodo.id }]);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className='calendarcard'>
      <Calendar
        defaultDate={moment().toDate()}
        defaultView='month'
        views={['month']}
        events={events}
        localizer={localizer}
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        className='calendar'
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Event"
        className='ReactModal__Content'
        overlayClassName='ReactModal__Overlay'
        appElement={document.getElementById('root')}
      >
        <h2>새로운 작업 추가</h2>
        <form className="modal-body">
          <label>
            작업:
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              style={{ backgroundColor: '#333', color: '#fff' }}
            />
          </label>
          <label>
            시작 날짜:
            <input
              type="date"
              value={moment(newEvent.start).format('YYYY-MM-DD')}
              onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
              style={{ backgroundColor: '#333', color: '#fff' }} 
            />
          </label>
          <label>
            종료 날짜:
            <input
              type="date"
              value={moment(newEvent.end).format('YYYY-MM-DD')}
              onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
              style={{ backgroundColor: '#333', color: '#fff' }} 
            />
          </label>
        </form>
        <div className="modal-footer">
          <button type="button" onClick={handleAddEvent}>추가</button>
          <button type="button" onClick={() => setModalIsOpen(false)}>취소</button>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarCard;
