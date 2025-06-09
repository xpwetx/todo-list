import './App.css';
import styles from './App.module.css';
import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import todosReducer, {
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

import TodosPage from './pages/TodosPage'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Header from './shared/Header'


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

const App = () => {
  const [todoListState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
const [title, setTitle] = useState('Todos');
  const location = useLocation ()


  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Todos')
        break
        case '/about':
          setTitle('About')
          break
          default:
            setTitle('Not Found')
    }
  }, [location])

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString?.trim()) {
      searchQuery = `&filterByFormula=SEARCH('${queryString.replace(/"/g, '\\"')}', {title})`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      try {
        const response = await fetch(encodeUrl(), {
          method: 'GET',
          headers: { Authorization: token },
        });

        if (!response.ok) throw new Error('Failed to fetch todos');

        const { records } = await response.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };

    fetchTodos();
  }, [encodeUrl]);

  // Add todo
  const addTodo = async (newTodo) => {
    dispatch({ type: todoActions.startRequest });

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
      dispatch({ type: todoActions.addTodo, record: records[0] });
      dispatch({ type: todoActions.endRequest });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  // Update todo
  const updateTodo = async (editedTodo) => {
    dispatch({ type: todoActions.updateTodo, editedTodo });

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

    try {
      const resp = await fetch(encodeUrl(), {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(resp.statusText);
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: { ...editedTodo, error: error.message },
      });
    }
  };

  // Delete todo
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
      dispatch({ type: todoActions.deleteTodo, id });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  return (
    <div className={styles.appContainer}>
  <Header title={title} />
  <Routes>
    <Route
    path='/'
    element={
      <TodosPage
      todoListState={todoListState}
      addTodo={addTodo}
      updateTodo={updateTodo}
      deleteTodo={deleteTodo}
      dispatch={dispatch}
      sortField={sortField}
      setSortField={setSortField}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
      queryString={queryString}
      setQueryString={setQueryString}
      todoActions={todoActions}
        />
    }
    />
<Route path='/about' element={<About />} />
<Route path='*' element={<NotFound />} />
     
  </Routes>
  </div>
    )
  }

export default App;
