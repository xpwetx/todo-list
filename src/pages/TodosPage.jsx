import React, { useEffect } from 'react';
import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList';
import TodosViewForm from '../features/TodosViewForm';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './TodosPage.module.css';

export default function TodosPage({
  todoListState,
  addTodo,
  updateTodo,
  deleteTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {

const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();

const itemsPerPage= 15;
const currentPage = parseInt(searchParams.get('page') || '1', 10);

const filteredTodoList = todoListState.todoList.filter((todo) => todo.title.toLowerCase().includes(queryString.toLowerCase())
);

const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
const currentTodos = filteredTodoList.slice(
  indexOfFirstTodo,
  indexOfFirstTodo + itemsPerPage
);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  useEffect(() => {
    if (totalPages > 0) {
      if (
        isNaN(currentPage) ||
        currentPage <1 ||
        currentPage > totalPages
      ) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
    <TodoForm addTodo={addTodo} isSaving={todoListState.isSaving} />
    <TodoList
    todoList={currentTodos}
    isLoading={todoListState.isLoading}
    onDeleteTodo={deleteTodo}
    onUpdateTodo={updateTodo}
    />

<div style={{ 
  display: 'flex', 
  gap: '1em', 
  alignItems: 'center', 
  marginTop: '1rem',
  }}>

  <button 
  onClick={handlePreviousPage} 
  disabled={currentPage === 1}
  >
    Previous
    </button>
<span>Page {currentPage} of {totalPages}</span>
<button 
onClick={handleNextPage} 
disabled={currentPage === totalPages}>Next</button>
</div>

    <TodosViewForm
    sortField={sortField}
    setSortField={setSortField}
    sortDirection={sortDirection}
    setSortDirection={setSortDirection}
    queryString={queryString}
    setQueryString={setQueryString}
    />
    </>
  );
}
