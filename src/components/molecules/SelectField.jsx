import React from 'react'
import Text from '../atoms/Text'
import Select from '../atoms/Select'

function SelectField({
  label,
  value,
  onChange,
  options = [],
  optionLabel = "nombre",
  optionValue = "id",
  placeholder = "Seleccionar...",
  error = '',
  className = '',
  labelClass = '',
  selectClass = '',
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

      <Select
        value={value}
        onChange={onChange}
        className={selectClass}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option
            key={opt[optionValue]}
            value={opt[optionValue]}
          >
            {opt[optionLabel]}
          </option>
        ))}
      </Select>

      {error && (
        <Text className="text-danger mt-1" style={{ fontSize: "0.85rem" }}>
          {error}
        </Text>
      )}
    </div>
  )
}

export default SelectField
