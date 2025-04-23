import React, { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState(''); // controlled input
const inputRef = useRef(null);

const handleChange = (e) => {
  setTitle(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();


    if (title.trim() === '') return;
onAddTodo(title);
setTitle('');
inputRef.current?.focus();
};

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithLabel
      elementId='todo-input'
        label='Todo'
        value={title}
        onChange={handleChange}
        ref={inputRef}
        />

      <button type="submit" disabled={title.trim() === ''}>Add Todo</button>
    </form>
  );

}
export default TodoForm;
