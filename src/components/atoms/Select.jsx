import React from 'react'
import { Form } from 'react-bootstrap'

function Select({
  value,
  onChange,
  children,
  className = '',
  ...props
}) {
  return (
    <Form.Select
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    >
      {children}
    </Form.Select>
  )
}

export default Select
