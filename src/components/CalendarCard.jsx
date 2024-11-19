import React from 'react';
//날짜와 시간을 다루기 위한 라이브러리
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
//material UI
import Modal from 'react-modal';
//utils
import useEvents from '../utils/useEvents';
import useModal from '../utils/useModal';

//momentLocalizer: moment.js를 캘리더의 날짜 형식에 맞게 로컬라이즈하는 역할 
const localizer = momentLocalizer(moment);

const CalendarCard = ({ tasks }) => {
  const [events, setEvents] = useEvents(tasks)
  const {
    modalIsOpen,
    newEvent,
    setNewEvent,
    handleSelectSlot,
    handleAddEvent,
    closeModal,
  } = useModal(events, setEvents)

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
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.bgColor,
          },
        })}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
          <button type="button" onClick={closeModal}>취소</button>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarCard;
