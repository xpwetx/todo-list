import React from 'react';

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) => {
  const preventRefresh = (e) => e.preventDefault();

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label htmlFor='search'>Search todos:</label>
        <input
        type='text'
        id='search'
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
        />
        <button
        type='button'
        onClick={() => setQueryString('')}
        >
            Clear
        </button>
        </div>
        <div>
        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;
