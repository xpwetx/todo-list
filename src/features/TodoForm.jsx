import React, { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const StyledButton = styled.button`
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-style: ${(props) => (props.disabled ? 'italic' : 'normal')};
`;

export default function TodoForm({ addTodo, isSaving }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;
    await addTodo({ title, isCompleted: false });
    setTitle('');
    console.log(title);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextInputWithLabel
        elementId="new-todo"
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo"
      />
      <StyledButton type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </StyledForm>
  );
}
