import React, { useState, useRef } from 'react';
import './App.css';
import Task from './task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const titleInputRef = useRef(null);

  const addTask = () => {
    const trimmedTitle = taskTitle.trim();
    const trimmedDescription = taskDescription.trim();
    
    if (trimmedTitle) {
      const newTask = {
        id: Date.now(),
        title: trimmedTitle,
        description: trimmedDescription
      };

      setTasks(prev => [...prev, newTask]);
      setTaskTitle('');
      setTaskDescription('');
      titleInputRef.current.focus();
    }
  };

  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setCompletedTasks(prev => [...prev, task]);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const deleteTask = (taskId, isCompleted) => {
    isCompleted 
      ? setCompletedTasks(prev => prev.filter(t => t.id !== taskId))
      : setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (field === 'title' && taskTitle.trim()) {
        document.getElementById("taskDescription").focus();
      } else if (field === 'description') {
        addTask();
      }
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          id="taskTitle"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'title')}
          ref={titleInputRef}
        />
        <input
          type="text"
          id="taskDescription"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'description')}
        />
        <button onClick={addTask}>
          Add
        </button>
      </div>
      <ul id="todoList">
        {tasks.map(task => (
          <Task
            key={task.id}
            taskTitle={task.title}
            taskDescription={task.description}
            onCompleted={() => completeTask(task.id)}
            onDelete={() => deleteTask(task.id, false)}
          />
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul id="completedList">
        {completedTasks.map(task => (
          <Task
            key={task.id}
            taskTitle={task.title}
            taskDescription={task.description}
            onDelete={() => deleteTask(task.id, true)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
