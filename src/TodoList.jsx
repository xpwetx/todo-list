import React from 'react';
import TodoListItem from './TodoListItem';

  
const TodoList = ({todoList, onCompleteTodo}) => {
const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
return (
  <div>
    {filteredTodoList.length === 0 ? (
      <p>Add todo above to get started.</p>
    ) : (
      <ul>
        {filteredTodoList.map((todo) => (
          <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          />
        ))}
      </ul>
    )}
  </div>
);
};


export default TodoList;
