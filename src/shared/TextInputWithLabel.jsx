import React from 'react';
const TextInputWithLabel = ({ elementId, labelText, onChange, inputRef, value }) => {
    return (
        <div className="input-group">
        <label htmlFor={elementId}>{labelText}</label>
        <input 
        id={elementId}
        type="text"
        onChange={onChange}
        ref={inputRef}
        value={value}
         />
        </div>
    );
};

export default TextInputWithLabel;