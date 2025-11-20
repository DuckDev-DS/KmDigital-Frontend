import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Text from '../atoms/Text'

function VisitUsSection() {
  return (
    <section className="mt-5">
      <Text as="h2" className="h4 mb-3">
        Visítanos
      </Text>
      <Text className="text-muted mb-4">
        También puedes conocer nuestros vehículos visitando nuestra sucursal.
      </Text>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Text as="h3" className="h5 mb-2">
                KM Digital Automotores
              </Text>
              <Text className="mb-2">
                Av. Siempre Viva 1234, Santiago, Chile
              </Text>
              <Text className="mb-2">
                Horario: Lunes a viernes, 09:00 a 18:30 hrs.
              </Text>
              <Text className="mb-2">
                Teléfono: +56 9 1234 5678
              </Text>
              <Text className="mb-0">
                Correo: contacto@kmdigital.cl
              </Text>
            </Col>

            <Col md={4} className="mt-3 mt-md-0">
              <div
                style={{
                  width: '100%',
                  height: '160px',
                  borderRadius: '12px',
                  backgroundColor: '#e5e7eb',
                }}
                className="d-flex align-items-center justify-content-center"
              >
                <Text className="text-muted text-center px-3">
                  Aquí después podemos poner un mapa o una foto de la sucursal.
                </Text>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </section>
  )
}

export default VisitUsSection
