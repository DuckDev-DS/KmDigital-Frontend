import React from 'react'
import { Spinner as BsSpinner } from 'react-bootstrap'

function Spinner({ className = '', ...props }) {
  return (
    <BsSpinner
      animation="border"
      role="status"
      className={className}
      {...props}
    >
      <span className="visually-hidden">Cargando...</span>
    </BsSpinner>
  )
}

export default Spinner
