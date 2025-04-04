import React, { useState } from 'react';
import TodoListItem from './TodoListItem';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'review resources' },
    { id: 2, title: 'take notes' },
    { id: 3, title: 'code out app' },
  ]);

  const [paragraphText, setParagraphText] = useState ('This is a controlled paragraph.')
  return (
    <div>
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
    <p>{paragraphText}</p>
    </div>
  );
}

export default TodoList;
