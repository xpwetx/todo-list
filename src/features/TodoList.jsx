import React from 'react';
import TodoListItem from './TodoList/TodoListItem';
import styles from './TodoList'
const TodoList = ({ todoList, isLoading, onUpdateTodo, onDeleteTodo, errorMessage }) => {
  if (isLoading) {
    return <p>Todo list loading...</p>;
  }

  return (
    <section>
      {errorMessage ? (
        <div role="alert" style={{ color: 'red' }}>
          <p>Error: {errorMessage}</p>
        </div>
      ) : null}
      
      {todoList.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem 
            key={todo.id} 
            todo={todo}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
             />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TodoList;
