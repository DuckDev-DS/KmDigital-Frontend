import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Text from '../atoms/Text'

import { useVisitUsData } from '../../hooks/VisitUsData.js'
import '../../styles/components/organisms/VisitUsSection.css'

function VisitUsSection() {
  const { sucursal, loading, error } = useVisitUsData()

  // Valores por defecto (fallback)
  const nombreSucursal = sucursal?.nombre || 'KM Digital Automotores'
  const direccion = sucursal?.direccion || 'Dirección no disponible'
  const telefono = sucursal?.telefono || 'No informado'
  const comunaNombre = sucursal?.comuna?.nombre || ''
  const regionNombre = sucursal?.comuna?.region?.nombre || ''

  const ubicacionTexto =
    comunaNombre && regionNombre
      ? `${comunaNombre}, ${regionNombre}`
      : comunaNombre || regionNombre || 'Ubicación no disponible'

  return (
    <section className="mt-5 visitus-section">
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
              {loading && (
                <>
                  <Text as="h3" className="h5 mb-2">
                    Cargando información de la sucursal...
                  </Text>
                </>
              )}

              {!loading && !error && (
                <>
                  <Text as="h3" className="h5 mb-2">
                    {nombreSucursal}
                  </Text>

                  <Text className="mb-2">{direccion}</Text>
                  <Text className="mb-2">{ubicacionTexto}</Text>

                  <Text className="mb-2">
                    Teléfono: {telefono}
                  </Text>

                  {/* Estos datos pueden seguir siendo estáticos por ahora */}
                  <Text className="mb-2">
                    Horario: Lunes a viernes, 09:00 a 18:30 hrs.
                  </Text>
                  <Text className="mb-0">
                    Correo: contacto@kmdigital.cl
                  </Text>
                </>
              )}

              {error && (
                <>
                  <Text as="h3" className="h5 mb-2">
                    KM Digital Automotores
                  </Text>
                  <Text className="mb-2">
                    No pudimos cargar la información de la sucursal.
                  </Text>
                </>
              )}
            </Col>

            <Col md={4} className="mt-3 mt-md-0">
              <div className="visit-us-map-placeholder">
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
