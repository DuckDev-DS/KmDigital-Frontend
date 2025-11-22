import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/molecules/VehicleCard.css'

function VehicleCard({ vehiculo }) {
  const titulo = vehiculo.nombre ?? `${vehiculo.modelo?.nombre ?? ''}`.trim()
  const modelo = vehiculo.modelo?.nombre
  const anio = vehiculo.anio
  const precio = vehiculo.precio
  const km = vehiculo.kilometraje
  const estado = vehiculo.estadoVenta

  const detalleUrl = `/vehiculo/${vehiculo.id}`

  return (
    <Link
      to={detalleUrl}
      state={{ vehiculo }}
      className="text-decoration-none text-reset vehicle-card-link"
    >
      <div className="vehicle-card card h-100 shadow-sm">
        {/* Imagen del vehículo */}
        {vehiculo.imagenAuto && (
          <img
            src={vehiculo.imagenAuto}
            alt={titulo}
            className="card-img-top vehicle-card-img"
          />
        )}

        <div className="card-body d-flex flex-column">
          {/* Título */}
          <h5 className="card-title">
            {titulo}
          </h5>

          {/* Modelo y año */}
          <p className="card-text mb-1">
            {modelo} • <strong>{anio}</strong>
          </p>

          {/* Precio */}
          <p className="card-text mb-2">
            Precio:{' '}
            <strong>
              {precio ? `$${precio.toLocaleString('es-CL')}` : 'No informado'}
            </strong>
          </p>

          {/* Kilometraje (opcional) */}
          {km !== undefined && (
            <p className="card-text mb-2">
              <small>{km.toLocaleString('es-CL')} km</small>
            </p>
          )}

          {/* Estado (opcional) */}
          {estado && (
            <small className="text-muted mt-auto">
              Estado: {estado}
            </small>
          )}
        </div>
      </div>
    </Link>
  )
}

export default VehicleCard
