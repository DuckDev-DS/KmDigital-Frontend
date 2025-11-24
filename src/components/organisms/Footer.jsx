import React from 'react'
import { Container } from 'react-bootstrap'
import Text from '../atoms/Text'
import { useVisitUsData } from '../../hooks/VisitUsData' 

import '../../styles/components/organisms/Footer.css'

function Footer() {
  // Obtener sucursal principal y la lista completa de sucursales
  //Reutilicé el hook creado para VisitUsSection y eliminé la lógica duplicada
  const { sucursal, sucursales = [] } = useVisitUsData()

  // Tomar hasta dos sucursales para mostrar en el footer (si no lo hago el footer se rompe al agregar más sucursales)
  const toShow = (sucursales && sucursales.length > 0) ? sucursales.slice(0, 2) : (sucursal ? [sucursal] : [])

  const year = new Date().getFullYear()

  return (
    <footer className="km-footer mt-5">
      <Container className="py-4">
        <div className="km-footer-main">
          <div className="d-flex gap-4 flex-column flex-md-row">
            {toShow.length === 0 && (
              <div>
                <Text as="h3" className="km-footer-brand mb-2">KM Digital Automotores</Text>
                <Text className="mb-1">Dirección no disponible</Text>
                <Text className="mb-1">No informado</Text>
                <Text className="mb-0">Correo: contacto@kmdigital.cl</Text>
              </div>
            )}

            {toShow.map((s, idx) => {
              const nombreSucursal = s?.nombre || `Sucursal ${idx + 1}`
              const direccion = s?.direccion || 'Dirección no disponible'
              const telefono = s?.telefono || 'No informado'
              const comunaNombre = s?.comuna?.nombre || ''
              const regionNombre = s?.comuna?.region?.nombre || ''
              const ubicacionTexto =
                comunaNombre && regionNombre
                  ? `${comunaNombre}, ${regionNombre}`
                  : comunaNombre || regionNombre || ''

              return (
                <div key={s?.id || idx}>
                  <Text as="h3" className="km-footer-brand mb-2">{nombreSucursal}</Text>
                  <Text className="mb-1">{direccion}</Text>
                  {ubicacionTexto && <Text className="mb-1">{ubicacionTexto}</Text>}
                  <Text className="mb-1">Teléfono: {telefono}</Text>
                  <Text className="mb-0">Correo: contacto@kmdigital.cl</Text>
                </div>
              )
            })}
          </div>

          <div className="km-footer-meta">
            <Text className="mb-0">© {year} KM Digital. Todos los derechos reservados.</Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
