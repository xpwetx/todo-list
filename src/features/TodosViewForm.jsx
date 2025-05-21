import React, { useState, useEffect } from 'react';

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) => {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (queryString !== localQueryString) {
        setQueryString(localQueryString);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handleSearchChange = (e) => {
    setLocalQueryString(e.target.value);
  };

  const handleClear = () => {
    setLocalQueryString('');
  };

  return (
    <section>
      <h2>View options:</h2>
      <label htmlFor="sortField">Sort by:</label>
      <select id="sortField" value={sortField} onChange={handleSortChange}>
        <option value="createdTime">Created time:</option>
        <option value="title">Title:</option>
      </select>

      <label htmlFor="sortDirection">Direction:</label>
      <select
        id="sortDirection"
        value={sortDirection}
        onChange={handleDirectionChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <label htmlFor="searchInput">Search:</label>
      <input
        id="searchInput"
        type="text"
        value={localQueryString}
        onChange={handleSearchChange}
      />

      <button onClick={handleClear} disabled={!localQueryString}>
        Clear
      </button>
    </section>
  );
};

export default TodosViewForm;
