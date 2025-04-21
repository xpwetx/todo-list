import React, { useState, useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodo] = useState(''); // controlled input

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (workingTodo.trim() === '') return;

    const newTodo = {
      title: workingTodo,
      id: Date.now() + Math.random(),
      isCompleted: false,
    };

    onAddTodo(newTodo); //pass new todo to parent
    setWorkingTodo(''); // clear input after submit
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add a todo..."
        value={workingTodo} // controlled by state
        onChange={(e) => setWorkingTodo(e.target.value)} // updates state
      />
      <button type="submit" disabled={workingTodo.trim() === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
