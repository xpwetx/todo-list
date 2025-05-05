import React, { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

const TodoListItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);

  };

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if(!isEditing) return;

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
         <button type='submit' onClick={handleUpdate}>Update</button>
         </>

      ) : (
        <div>
          <input
          type='checkbox'
          checked={todo.isCompleted}
          onChange={() => onUpdateTodo({ ...todo, isCompleted: !todo.isCompleted })}
          />
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          <button type='button' onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={() => onDeleteTodo(todo.id)}>Delete</button>
      </div>
      )}
      </form>
  );
};
      

export default TodoListItem;
