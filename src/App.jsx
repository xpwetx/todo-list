import './App.css';
import React, { useState, useRef } from 'react';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updateTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return {...todo, isCompleted: true};
      }
    });
    setTodoList(updateTodos);
  };

  return (
    <div>
      <h1>My Todos</h1>
    <TodoForm onAddTodo={addTodo} />
    <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}
   export default App;