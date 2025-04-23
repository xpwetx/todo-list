import React from 'react';
const TextInputWithLabel = ({ elementId, labelText, onChange, inputRef, value }) => {
    return (
        <>
        <label htmlFor={elementId}>{labelText}</label>
        <input 
        id={elementId}
        type="text"
        onChange={onChange}
        ref={inputRef}
        value={value} />
        </>
    );
};

export default TextInputWithLabel;