import React from 'react'
import { Container } from 'react-bootstrap'
import Text from '../atoms/Text'
import { useVisitUsData } from '../../hooks/VisitUsData' 

import '../../styles/components/organisms/Footer.css'

function Footer() {
  const { sucursal } = useVisitUsData()

  const nombreSucursal = sucursal?.nombre || 'KM Digital Automotores'
  const direccion = sucursal?.direccion || 'Dirección no disponible'
  const telefono = sucursal?.telefono || 'No informado'

  const comunaNombre = sucursal?.comuna?.nombre || ''
  const regionNombre = sucursal?.comuna?.region?.nombre || ''

  const ubicacionTexto =
    comunaNombre && regionNombre
      ? `${comunaNombre}, ${regionNombre}`
      : comunaNombre || regionNombre || ''

  const year = new Date().getFullYear()

  return (
    <footer className="km-footer mt-5">
      <Container className="py-4">
        <div className="km-footer-main">
          <div>
            <Text as="h3" className="km-footer-brand mb-2">
              {nombreSucursal}
            </Text>
            <Text className="mb-1">{direccion}</Text>
            {ubicacionTexto && (
              <Text className="mb-1">{ubicacionTexto}</Text>
            )}
            <Text className="mb-1">Teléfono: {telefono}</Text>
            <Text className="mb-0">Correo: contacto@kmdigital.cl</Text>
          </div>

          <div className="km-footer-meta">
            <Text className="mb-0">
              © {year} KM Digital. Todos los derechos reservados.
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
