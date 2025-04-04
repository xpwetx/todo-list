import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [newTodo, setNewTodo] = useState('');
  return (
    <div>
    
  
      <TodoForm />
      <TodoList />
      </div>
  );
}

export default App;
