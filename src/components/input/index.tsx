import React from 'react'

interface InputProps {
  value: string
}

const Input: React.FC<InputProps> = ({ value }) => {
  return <input value={value} />
}
export default Input
