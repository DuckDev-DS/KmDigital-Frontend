import React from 'react'
import { Form } from 'react-bootstrap'

function Input({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  ...props
}) {
  return (
    <Form.Control
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  )
}

export default Input
