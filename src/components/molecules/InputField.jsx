import React from 'react'
import Text from '../atoms/Text'
import Input from '../atoms/Input'

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  className = '',
  labelClass = '',
  inputClass = '',
  ...props
}) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <Text
          as="label"
          className={`form-label ${labelClass}`}
        >
          {label}
        </Text>
      )}

      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
        {...props}
      />

      {error && (
        <Text className="text-danger mt-1" style={{ fontSize: "0.85rem" }}>
          {error}
        </Text>
      )}
    </div>
  )
}

export default InputField
