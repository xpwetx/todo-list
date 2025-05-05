import React, { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ addTodo, isSaving }) {
  const [title, setTitle] = useState(''); // controlled input
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTodo({ title, isCompleted: false });
    setTitle('');
    console.log(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithLabel
        elementId="new-todo"
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}
export default TodoForm;
