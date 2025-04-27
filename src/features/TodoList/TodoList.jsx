import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onUpdateTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoListItem todo={todo} onUpdateTodo={onUpdateTodo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
