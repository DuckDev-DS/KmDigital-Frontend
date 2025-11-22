import React from 'react'
import { useCart } from '../../context/CartContext.jsx'

function VehicleDetailColumn({ vehiculo, onBack, onCatalog }) {
  const { addToCart, cart } = useCart()

  const {
    nombre,
    descripcion,
    precio,
    anio,
    kilometraje,
    estadoVenta,
    modelo,
    categoria,
    paisOrigen,
    tipoCombustible,
    sucursal,
    transmission,
  } = vehiculo

  const titulo = nombre || modelo?.nombre || 'Detalle del vehículo'

  const handleComprar = () => {
    const exists = cart.some((v) => v.id === vehiculo.id)

    if (exists) {
      alert('Este vehículo ya está en tu carrito.')
      return
    }

    addToCart(vehiculo)
    alert('Vehículo añadido al carrito.')
  }

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">

        <h3 className="card-title mb-2">{titulo}</h3>

        <p className="text-muted mb-3">
          {descripcion || 'Sin descripción registrada.'}
        </p>

        <div className="mb-3">
          <h4 className="mb-0">{precio ?? 'No informado'}</h4>
          <small className="text-muted">Precio referencial</small>
        </div>

        <div className="row">
          <div className="col-6 mb-2">
            <strong>Año:</strong>
            <div>{anio ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>Kilometraje:</strong>
            <div>{kilometraje ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>Modelo:</strong>
            <div>{modelo?.nombre ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>Categoría:</strong>
            <div>{categoria?.nombre ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>País de origen:</strong>
            <div>{paisOrigen?.nombre ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>Combustible:</strong>
            <div>{tipoCombustible?.nombre ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>Transmisión:</strong>
            <div>{transmission?.nombre ?? '—'}</div>
          </div>
          <div className="col-6 mb-2">
            <strong>Sucursal:</strong>
            <div>{sucursal?.nombre ?? '—'}</div>
          </div>
        </div>

        {estadoVenta && (
          <p className="mt-3">
            <strong>Estado de venta:</strong> {estadoVenta}
          </p>
        )}

        <div className="mt-auto d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={onBack}
          >
            Volver
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleComprar}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetailColumn
