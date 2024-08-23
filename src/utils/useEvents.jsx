import { useState, useEffect } from 'react';

const useEvents = (tasks) => {
  const [events, setEvents] = useState([]);

  //api 에서 가져온 데이터를 캘린더에 맞는 형식으로 변환하여 events 상태를 업데이트
  useEffect(() => {
    if (tasks.length > 0) {
      const formattedTasks = tasks.map(task => ({
        ...task,
        title: task.todo,
        start: new Date(task.startDate),
        end: new Date(task.endDate),
        bgColor: task.bgColor || getRandomColor(),
      }));
      setEvents(formattedTasks);
    } else {
      // tasks가 빈 배열일 때 events도 빈 배열로 설정
      setEvents([]);
    }
  }, [tasks]);

  return [events, setEvents]
}

//캘린더에 작업 별 랜덤 배경색 함수
const getRandomColor = () => {
  const letters = '123456789ABCDEF'
  let color = '#'
  for(let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default useEvents