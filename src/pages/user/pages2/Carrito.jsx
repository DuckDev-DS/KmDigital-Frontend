import React from 'react'
import { useCarritoData } from '../datapages/CarritoData.js'

import SectionHeader from '../../../components/molecules/SectionHeader.jsx'
import VehicleCard from '../../../components/molecules/VehicleCard.jsx'
import Display from '../../../components/molecules/Display.jsx'
import '../../../styles/components/organisms/CardGrid.css'

function Carrito() {
  const {
    cart,
    removeFromCart,
    clearCart,
    total,
  } = useCarritoData()

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <SectionHeader
          title="Carrito vacío"
          subtitle="Agrega vehículos para verlos aquí."
        />
      </div>
    )
  }

  return (
    <div className="container my-5">
      <SectionHeader
        title="Tu carrito"
        subtitle="Revisa tus vehículos seleccionados antes de continuar con la compra."
      />

      <div className="row">
        {/* Lista de vehículos */}
        <div className="col-12 col-lg-8 mb-4">
          <div className="row">
            {cart.map((vehiculo) => (
              <div
                className="col-12 col-md-6 col-lg-6 mb-4"
                key={vehiculo.id}
              >
                <div className="position-relative">
                  <VehicleCard vehiculo={vehiculo} />

                  {/* Botón eliminar */}
                  <button
                    className="btn btn-danger position-absolute top-0 end-0 m-2"
                    onClick={() => removeFromCart(vehiculo.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen (Display) */}
        <div className="col-12 col-lg-4">
          <Display
            title="Resumen de compra"
            subtitle={
              `Vehículos en el carrito: ${cart.length}\n` +
              `Total: ${total > 0 ? total : 'No disponible'}`
            }
            height="auto"
            padding="1.5rem"
            radius="16px"
          />

          <button
            className="btn btn.success w-100 mt-3"
            onClick={() =>
              alert('Simulación de pago: próximamente podrás completar tu compra.')
            }
          >
            Pagar
          </button>

          <button
            className="btn btn-outline-light w-100 mt-3"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default Carrito
