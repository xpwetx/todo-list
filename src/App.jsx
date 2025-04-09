import './App.css';
import React, { useState, useRef } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  // handleAddTodo function to add new todos to list
  function handleAddTodo(newTodo) {
    if (newTodo) {
      setTodoList([...todoList, { id: Date.now(), title: newTodo }]);
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
