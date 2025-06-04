import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  margin-bottom: 0.5em;
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
`;

export default function TextInputWithLabel({
  elementId,
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <Wrapper>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        id={elementId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
      />
    </Wrapper>
  );
}
