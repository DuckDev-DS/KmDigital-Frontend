import React from "react"

function Text({ children, className = "", as = "p", ...props }) {
  const Component = as
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}

export default Text
