import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import InputField from '../molecules/InputField'
import SelectField from '../molecules/SelectField'

import '../../styles/components/organisms/HeroWithForm.css'

function HeroWithForm({
  title,
  subtitle,
  fields = [],
  values = {},
  onChange,
  onSubmit,
  submitLabel = 'Enviar'
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(values)
  }

  const renderField = (field) => {
    const {
      key,
      label,
      type = 'text',
      placeholder = '',
      options = [],
      optionLabel = 'nombre',
      optionValue = 'id',
      colSize = 12,
    } = field

    const value = values[key] ?? ''

    if (type === 'select') {
      return (
        <Col key={key} xs={12} md={colSize}>
          <SelectField
            label={label}
            value={value}
            onChange={(e) => onChange?.(key, e.target.value)}
            options={options}
            optionLabel={optionLabel}
            optionValue={optionValue}
            placeholder={placeholder}
          />
        </Col>
      )
    }

    return (
      <Col key={key} xs={12} md={colSize}>
        <InputField
          label={label}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(key, e.target.value)}
        />
      </Col>
    )
  }

  return (
    <Row className="align-items-center mb-5 hero-with-form">
      <Col md={6} className="mb-4 mb-md-0">
        <Text as="h1" className="fw-bold mb-3 hero-with-form-title">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-muted mb-4 hero-with-form-subtitle">
            {subtitle}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Row>{fields.map(renderField)}</Row>
          <Button type="submit" className="mt-2 w-100 hero-with-form-button">
            {submitLabel}
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default HeroWithForm
