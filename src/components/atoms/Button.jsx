import React from "react"
import { Button as BsButton } from "react-bootstrap"

function Button({ children, className = "", variant = "primary", ...props }) {
  return (
    <BsButton variant={variant} className={className} {...props}>
      {children}
    </BsButton>
  )
}

export default Button

