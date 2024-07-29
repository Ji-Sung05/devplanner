import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchTasksQuery, useAddTaskMutation, useUpdateTaskMutation } from '../app/project';
//pages
import Home from './Home';
//components
import TodoSection from '../components/TodoSection';
import TableHeader from '../components/TableHeader';

const Work = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [rows, setRows] = useState([]);
  const [currentId, setCurrentId] = useState(1);

  const plusCurrentId = () => {
    setCurrentId(currentId + 1)
  }

  const { data: tasks = [] } = useFetchTasksQuery(id, {
    skip: !id
  })
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    if(tasks && tasks.length > 0) {
      setRows(tasks.map((task) => ({
        ...task,
        date: task.date ? task.date.split('T')[0] : ''
      })))
      const maxId = Math.max(...tasks.map((task) => task.taskId), currentId)
      setCurrentId(maxId + 1)
    }
  }, [tasks])
  
  const todo = rows.filter(row => {
    return row.status === 'To Do'
  })

  const inprogress = rows.filter(row => {
    return row.status === 'In Progress'
  })

  const done = rows.filter(row => {
    return row.status === 'Done'
  })

  const handleAddWork = async () => {
    const newRow = {
      taskId: currentId,
      todo: '', // 초기값
      worker: '',
      date: '',
      content: '',
      status: 'To Do'
    };
    setRows((prevRows) => [...prevRows, newRow]);
    plusCurrentId()
  };
  
  const handleEditCell =  async (rowId, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.taskId === rowId ? { ...row, [field]: value } : row))
    );
  };

  const updateTodoHandler = async (rowId) => {
    const update = rows.find((row) => row.taskId === rowId)
    const updateTodo = {
      todo: update.todo,
      worker: update.worker,
      date: update.date,
      content: update.content,
    }
    try {
      await updateTask({ projectId: id, taskId: rowId, task: updateTodo }).unwrap();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  const updateStatusHandler = async (rowId, status) => {
    const update = rows.find((row) => row.taskId === rowId)

    // 상태 변경 로직
    let newStatus;
    if (status === 'To Do') {
        newStatus = 'In Progress';
    } else if (status === 'In Progress') {
        newStatus = 'Done';
    } else if (status === 'Done') {
        // Done 상태일 경우 아무 것도 하지 않음
        return;
    }

    const updateTodo = {
      todo: update.todo,
      worker: update.worker,
      date: update.date,
      content: update.content,
      status: newStatus,
    }
    try {
      await updateTask({ projectId: id, taskId: rowId, task: updateTodo }).unwrap();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  const AddTodoHandler = async (rowId) => {
    const newTask = rows.find((row) => row.taskId === rowId)
    const newTodo = {
      taskId: newTask.taskId,
      todo: newTask.todo,
      worker: newTask.worker,
      date: newTask.date,
      content: newTask.content,
    }
    try {
      await addTask({ projectId: id, task: newTodo }).unwrap();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }
  
  return (
    <Home>
      <div className='work__top'>
        <p>client</p>
        <select name="options" id="options">
          <option value="">목록 ▼</option>
          <option value="list">list</option>
          <option value="board">board</option>
          <option value="chat">chat</option>
        </select>
      </div>
      <div className='work__inner'>
        <TableHeader />
        <TodoSection data={todo} title={'할 일'} $addWork={true} handleAddWork={handleAddWork} handleEditCell={handleEditCell} updateTodoHandler={updateTodoHandler} AddTodoHandler={AddTodoHandler} updateStatusHandler={updateStatusHandler} />
        <TodoSection data={inprogress} title={'진행중'} $addWork={false} handleAddWork={handleAddWork} handleEditCell={handleEditCell} updateTodoHandler={updateTodoHandler} AddTodoHandler={AddTodoHandler} updateStatusHandler={updateStatusHandler} />
        <TodoSection data={done} title={'작업 완료'} $addWork={false} handleAddWork={handleAddWork} handleEditCell={handleEditCell} updateTodoHandler={updateTodoHandler} AddTodoHandler={AddTodoHandler} updateStatusHandler={updateStatusHandler} />
      </div>
    </Home>
  );
};

export default Work;
