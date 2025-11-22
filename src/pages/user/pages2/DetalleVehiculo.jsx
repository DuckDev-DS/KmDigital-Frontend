import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useVehiculoData } from '../datapages/VehiculoData.js'
import SectionHeader from '../../../components/molecules/SectionHeader.jsx'
import CardGrid from '../../../components/organisms/CardGrid.jsx'
import VehicleDetailColumn from '../../../components/organisms/VehicleDetailColumn.jsx'


function DetalleVehiculo() {
  const navigate = useNavigate()
  const { vehiculo, similares, error } = useVehiculoData()


  if (error || !vehiculo) {
    return (
      <div className="container my-5">
        <SectionHeader
          title="Vehículo no encontrado"
          subtitle="No pudimos cargar la información del vehículo solicitado."
        />
        <button
          type="button"
          className="btn btn-outline-light mt-3"
          onClick={() => navigate('/catalogo')}
        >
          Volver al catálogo
        </button>
      </div>
    )
  }

  const {
    nombre,
    imagenAuto,
    modelo,
  } = vehiculo

  const titulo =
    nombre ||
    modelo?.nombre ||
    'Detalle del vehículo'

  return (
    <div className="container my-5">
      <SectionHeader
        title={titulo}
        subtitle="Revisa en detalle las características de este vehículo."
      />

      {/* Bloque principal */}
      <div className="row mb-4">
        {/* Columna imagen */}
        <div className="col-12 col-lg-6 mb-3">
          <div className="card h-100 shadow-sm">
            {imagenAuto ? (
              <img
                src={imagenAuto}
                alt={titulo}
                className="card-img-top img-fluid"
              />
            ) : (
              <div className="card-body d-flex align-items-center justify-content-center">
                <span className="text-muted">Sin imagen disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Columna info*/}
        <div className="col-12 col-lg-6">
          <VehicleDetailColumn
            vehiculo={vehiculo}
            onBack={() => navigate(-1)}
            onCatalog={() => navigate('/catalogo')}
          />
        </div>
      </div>

      {/* Vehículos similares */}
      {similares && similares.length > 0 && (
        <section className="mt-4">
          <h4 className="mb-3">Vehículos similares</h4>
          <CardGrid
            loading={false}
            error={false}
            items={similares}
          />
        </section>
      )}
    </div>
  )
}

export default DetalleVehiculo
