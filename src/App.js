import React, { useState, useRef } from 'react';
import './App.css';
import Task from './task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const descriptionRef = useRef();

  const addTask = (taskTitle, taskDescription) => {
    if (taskTitle && taskDescription) {
      setTasks(prevTasks => [...prevTasks, { title: taskTitle, description: taskDescription }]);
      // Clear title and description inputs
      document.getElementById("taskTitle").value = '';
      document.getElementById("taskDescription").value = '';
      document.getElementById("taskTitle").focus(); // Refocus on the title input
    }
  };
  

  const completeTask = (taskIndex) => {
    const taskToComplete = tasks[taskIndex];
    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, taskToComplete]);
    setTasks(prevTasks => prevTasks.filter((task, index) => index !== taskIndex));
  };

  const deleteTask = (taskIndex, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(prevCompletedTasks =>
        prevCompletedTasks.filter((task, index) => index !== taskIndex)
      );
    } else {
      setTasks(prevTasks =>
        prevTasks.filter((task, index) => index !== taskIndex)
      );
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
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Prevent form submission
              const taskTitle = event.target.value.trim();
              descriptionRef.current.focus(); // Focus on the description input
              if (taskTitle) {
                // Skip adding task if the title is empty
                const taskDescription = document.getElementById("taskDescription").value.trim();
                addTask(taskTitle, taskDescription);
              }
            }
          }}
        />
        <input
          type="text"
          id="taskDescription"
          placeholder="Enter task description"
          ref={descriptionRef}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Prevent form submission
              const taskDescription = event.target.value.trim();
              const taskTitle = document.getElementById("taskTitle").value.trim();
              addTask(taskTitle, taskDescription);
            }
          }}
        />
        <button onClick={() => {
          const taskTitle = document.getElementById("taskTitle").value.trim();
          const taskDescription = document.getElementById("taskDescription").value.trim();
          addTask(taskTitle, taskDescription);
          document.getElementById("taskTitle").value = '';
          document.getElementById("taskDescription").value = '';
        }}>
          Add
        </button>
      </div>
      <ul id="todoList">
        {tasks.map((task, index) => (
          <Task
            key={index}
            taskTitle={task.title}
            taskDescription={task.description}
            onCompleted={() => completeTask(index)}
            onDelete={() => deleteTask(index, false)}
          />
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul id="completedList">
        {completedTasks.map((task, index) => (
          <Task
            key={index}
            taskTitle={task.title}
            taskDescription={task.description}
            onDelete={() => deleteTask(index, true)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
