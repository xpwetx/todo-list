import './App.css';
import styles from './App.module.css';
import React, { useCallback, useState, useEffect } from 'react';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';

<img src="/logo.png" alt="Logo" style={{ width: '100px' }} />;
const preventRefresh = (e) => e.preventDefault();

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

const App = () => {
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [queryString, setQueryString] = useState('');

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString?.trim()) {
      searchQuery = `&filterByFormula=SEARCH('${queryString.replace(/"/g, '\\"')}', {title})`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: { Authorization: token },
        };
        const response = await fetch(encodeUrl(), options);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const { records } = await response.json();
        const todos = records.map((record) => ({
          id: record.id,
          title: record.fields.title,
          isCompleted: record.fields.isCompleted || false,
        }));
        setTodoList(todos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    try {
      setIsSaving(true);

      const resp = await fetch(encodeUrl(), {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error(resp.statusText);

      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
        isCompleted: records[0].fields.isCompleted || false,
      };

      setTodoList((prev) => [...prev, savedTodo]);
    } catch (error) {
      console.error('Error saving todo:', error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    setTodoList((prev) =>
      prev.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) throw new Error(resp.statusText);

      const { records } = await resp.json();
      const updatedTodo = {
        id: records[0].id,
        ...records[0].fields,
        isCompleted: records[0].fields.isCompleted || false,
      };

      setTodoList((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList(revertedTodos);
    }
  };

  const deleteTodo = async (id) => {
    const deleteUrl = `${url}/${id}`;
    try {
      const resp = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });

      if (!resp.ok) throw new Error(resp.statusText);

      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.appContainer}>
      <main>
        <h1>Todos</h1>
        <TodoForm addTodo={addTodo} isSaving={isSaving} />
        {isSaving && <p>Saving new todo...</p>}

        <TodoList
          todoList={todoList}
          isLoading={isLoading}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />

        <hr />

        <TodosViewForm
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          queryString={queryString}
          setQueryString={setQueryString}
        />
        {errorMessage && (
          <div className={styles.errorBox}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
            >
              <img
                src="/error-icon.png"
                alt="Error icon"
                style={{ width: '20px', height: '20px' }}
              />
              <p style={{ margin: 0 }}>Error: {errorMessage}</p>
            </div>

            <button onClick={() => setErrorMessage('')}>Dismiss</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
