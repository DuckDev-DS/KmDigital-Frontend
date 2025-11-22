import React from 'react'
import VehicleCard from '../molecules/VehicleCard.jsx'
import '../../styles/components/organisms/CardGrid.css'

function CardGrid({ loading, error, items }) {
  if (loading) {
    return <p>Cargando resultados...</p>
  }

  if (error) {
    return <p className="text-danger">Ocurrió un error al cargar los datos.</p>
  }

  if (!items || items.length === 0) {
    return <p>No se encontraron resultados.</p>
  }

  return (
    <div className="card-grid row">
      {items.map((vehiculo) => (
        <div
          className="col-12 col-sm-6 col-lg-4 mb-4 card-grid-item"
          key={vehiculo.id}
        >
          <VehicleCard vehiculo={vehiculo} />
        </div>
      ))}
    </div>
  )
}

export default CardGrid
