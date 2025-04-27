import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

const TodoListItem = ({ todo, onUpdateTodo }) => {
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);

  };
  
  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();

    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleUpdate}>
      {isEditing ? (
        <>
        <TextInputWithLabel 
        elementId={`edit-${todo.id}`}
        label='Edit Todo'
        value={workingTitle} 
        onChange={handleEdit}
         />
         <button type='button' onClick={handleCancel}>
         Cancel</button>
         <button type='button' onClick={handleUpdate}>Update</button>
         </>

      ) : (
        <div>
          <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onUpdateTodo({ ...todo, completed: !todo.completed })}
          />
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          <button type='button' onClick={() => setIsEditing(true)}>
            Edit
          </button>
      </div>
      )}
      </form>
  );
};
        
      

export default TodoListItem;
