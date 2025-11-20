import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import InputField from '../molecules/InputField'
import SelectField from '../molecules/SelectField'


function HeroWithForm({
  title,
  subtitle,
  fields = [],
  values = {},
  onChange,
  onSubmit,
  submitLabel = 'Enviar',
  rightContent = null,
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
      colSize = 12, // para controlar layout por campo
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

    //text / email / number / password, etc.
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
    <Row className="align-items-center mb-5">
      <Col md={6} className="mb-4 mb-md-0">
        <Text as="h1" className="fw-bold mb-3">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-muted mb-4">
            {subtitle}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Row>
            {fields.map(renderField)}
          </Row>

          <Button type="submit" className="mt-2 w-100">
            {submitLabel}
          </Button>
        </form>
      </Col>

      <Col md={6}>
        {rightContent ?? (
          <div
            className="w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              minHeight: '260px',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #f36c21 100%)',
              color: 'white',
              boxShadow: '0 18px 35px rgba(15, 23, 42, 0.4)',
            }}
          >
            <Text as="h3" className="fw-semibold text-center px-4">
              {/* contenido por defecto si no mandas rightContent */}
              Una experiencia digital moderna para tu proyecto.
            </Text>
          </div>
        )}
      </Col>
    </Row>
  )
}

export default HeroWithForm
