import React from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { FaSearch } from 'react-icons/fa'

function SearchField({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar...",
  className = "",
  inputClass = "",
  buttonClass = "",
}) {
  return (
    <div className={`d-flex align-items-center gap-2 ${className}`}>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClass}
      />

      <Button
        variant="primary"
        onClick={onSearch}
        className={buttonClass}
      >
        <FaSearch size={14} />
      </Button>
    </div>
  )
}

export default SearchField
