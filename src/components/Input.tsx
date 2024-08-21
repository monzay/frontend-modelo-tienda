import React from 'react'

interface InputProps {
  name: string;
  value: string;
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ name, value, inputChange, placeholder }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={inputChange}
      placeholder={placeholder}
    />
  )
}

export default Input