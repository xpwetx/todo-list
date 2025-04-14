import React, { useState, useRef } from 'react';


function TodoForm({onAddTodo}) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTodo(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            ref ={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
    </form>
    );
}
 
   

export default TodoForm;