import './App.css';
import React, { useState, useRef } from 'react';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
  };

  const updateTodo= (editedTodo) => {
    const updatedTodo = todoList.map((todo) =>
    todo.id === editedTodo.id ? {...editedTodo } : todo
  );
    setTodoList(updatedTodo);
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todoList} onUpdateTodo={updateTodo} />
    </div>
  );
};

export default App;
