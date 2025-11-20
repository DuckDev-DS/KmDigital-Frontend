import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Text from '../atoms/Text'
import Button from '../atoms/Button'


function IconGridSection({
  title,
  subtitle,
  items = [],
  getKey = (item) => item.id,
  getLabel = (item) => item.nombre ?? '',
  getIconLetter = (item) => getLabel(item).charAt(0).toUpperCase(),
  renderIcon,
  selectedId,
  onSelect,
}) {
  return (
    <section className="mb-5">
      <Text as="h2" className="h4 mb-2">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-muted mb-3">
          {subtitle}
        </Text>
      )}

      <Row className="g-3">
        {items.map((item) => {
          const key = String(getKey(item))
          const label = getLabel(item)
          const isActive = selectedId != null && String(selectedId) === key

          return (
            <Col key={key} xs={6} sm={4} md={3} lg={2}>
              <Button
                variant={isActive ? 'primary' : 'outline-secondary'}
                className="w-100 d-flex flex-column align-items-center py-3"
                onClick={() => onSelect?.(key, item)}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    backgroundColor: '#f3f4f6',
                    marginBottom: '8px',
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  {renderIcon ? (
                    renderIcon(item)
                  ) : (
                    <Text className="fw-bold mb-0">
                      {getIconLetter(item)}
                    </Text>
                  )}
                </div>
                <Text className="small mb-0 text-center">
                  {label}
                </Text>
              </Button>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

export default IconGridSection
