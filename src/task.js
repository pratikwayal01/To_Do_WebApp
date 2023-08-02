import React from 'react';

function Task({ taskTitle, taskDescription, onCompleted, onDelete }) {
  return (
    <li>
      <div className="task-title">{taskTitle}</div>
      <div className="task-description">{taskDescription}</div>
      {onCompleted && <button className="complete-button" onClick={onCompleted}>Complete</button>}
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </li>
  );
}

export default Task;
