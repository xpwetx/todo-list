import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('');
  return (
    <div>
      <h1>My Todos</h1>

      {/*Input field to add new todo item*/}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />

      <button onClick={() => console.log(newTodo)}>Add Todo</button>
      <p>{newTodo}</p>

      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
