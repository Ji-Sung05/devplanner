import React, { useEffect, useState, createContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTasksMutation } from '../app/project';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages
import Home from './Home';
//components
import TableHeader from '../components/TableHeader';
import BoardContainer from '../components/BoardContainer';
import ListContainer from './../components/ListContainer';
import Commit from '../components/Commit';

export const actionContext = createContext()

const Work = () => {
  const location = useLocation();
  const { id, name, org } = location.state;
  const [rows, setRows] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [category, setCategory] = useState('');
  
  const plusCurrentId = () => {
    setCurrentId(currentId + 1)
  }
  
  const { data: tasks = [] } = useFetchTasksQuery(id, {
    skip: !id
  })
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTasksMutation();

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

  let doneLength = done.length

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

  const actions = useMemo(
    () => ({
      edit: async (rowId, field, value) => {
        setRows((prevRows) =>
          prevRows.map((row) => (row.taskId === rowId ? { ...row, [field]: value } : row))
        );
      },
      add: async (rowId) => {
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
          toast("작업이 성공적으로 저장되었습니다!")
        } catch (error) {
          console.error('Error saving task:', error);
          toast.error("작업 저장을 실패했습니다.")
        }
      },
      update: async (rowId) => {
        const update = rows.find((row) => row.taskId === rowId)
        const updateTodo = {
          todo: update.todo,
          worker: update.worker,
          date: update.date,
          content: update.content,
        }
        try {
          await updateTask({ projectId: id, taskId: rowId, task: updateTodo }).unwrap();
          toast('작업이 성공적으로 수정되었습니다!')
        } catch (error) {
          console.error('Error saving task:', error);
          toast.error('작업 수정을 실패했습니다.')
        }
      },
      updateStatus: async (rowId, status) => {
        const update = rows.find((row) => row.taskId === rowId)

        let newStatus;
        if (status === 'To Do') {
            newStatus = 'In Progress';
        } else if (status === 'In Progress') {
            newStatus = 'Done';
        } else if (status === 'Done') {
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
          toast.info('작업을 완료했습니다!')
        } catch (error) {
          console.error('Error saving task:', error);
          toast.error('작업 완료를 실패했습니다.')
        }
      },
      deleteTask: async (rowId) => {
        try {
          await deleteTask({ projectId: id, taskId: rowId }).unwrap()
          toast.info('작업을 성공적으로 삭제했습니다!')
        } catch(error) {
          console.error('Error delete task:', error)
          toast.error('작업 삭제를 실패했습니다.')
        }
      }
    }),
    [rows, id, addTask, updateTask, deleteTask]
  )

  return (
    <Home>
      <div className='work__top'>
        <p>{name}</p>
        <select name="options" id="options" onChange={(e) => setCategory(e.target.value)}>
          <option value="">목록 ▼</option>
          <option value="list">list</option>
          <option value="board">board</option>
          <option value="commit">commit</option>
        </select>
      </div>
      <div className={`work__inner ${category === 'commit' ? 'no-gap' : ''}`}>
        <actionContext.Provider value={actions}>
          <TableHeader doneLength={doneLength} category={category} />
          {category === '' || category === 'list' ? (
            <ListContainer todo={todo} inprogress={inprogress} done={done} addWork={handleAddWork} />
          ) : category === 'board' ? (
            <BoardContainer todo={todo} inprogress={inprogress} done={done} addWork={handleAddWork} />
          ) : category === 'commit' ?  (
            <Commit repoName={name} orgName={org} />
          ) : null}
        </actionContext.Provider>
      </div>
      <ToastContainer 
        position='bottom-right'
        theme='light'
        autoClose={1500}
      />
    </Home>
  );
};

export default Work;
