import React, { useEffect, useState } from 'react'
import EditableTable from '../components/EditableTable';
import { FaPlus } from "react-icons/fa6";
import { useAddTaskMutation, useFetchTasksQuery } from '../app/project'; 
import { ObjectId } from 'bson';

const TodoSection = ({ title, projectId, $addWork }) => {
  const { data: tasks = [], refetch } = useFetchTasksQuery(projectId, {
    skip: !projectId
  });
  const [rows, setRows] = useState([]);
  const [addTask] = useAddTaskMutation();

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setRows(tasks.map(task => ({
        ...task,
        date: task.date ? task.date.split('T')[0] : ''
      })));
    }
  }, [tasks])

  const handleEditCell = (rowId, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row._id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const handleSaveToServer = async (rowId) => {
    const updatedTask = rows.find((row) => row._id === rowId);
    const taskToSave = {
      todo: updatedTask.todo,
      worker: updatedTask.worker,
      date: updatedTask.date,
      content: updatedTask.content,
    };
    try {
      await addTask({ projectId, task: taskToSave }).unwrap();
      refetch()
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleAddWork = async () => {
    const newRow = {
      _id: new ObjectId().toString(),
      todo: '', // 초기값
      worker: '',
      date: '',
      content: '',
    };
    setRows((prevRows) => [...prevRows, newRow]); // 새로운 행 추가
  };

  return (
    <section>
      <h2>{title}</h2>
      <EditableTable rows={rows} onEditCell={handleEditCell} onSave={handleSaveToServer} />
      {$addWork ? (
        <div>
          <FaPlus onClick={handleAddWork} />
          <span>작업 추가</span>
        </div>
      ) : null}
    </section>
  )
}

export default TodoSection