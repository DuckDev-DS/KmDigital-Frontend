import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import IconGridSection from '../../../components/organisms/IconGridSection.jsx'
import VisitUsSection from '../../../components/organisms/VisitUsSection.jsx'

import { useHomeData } from '../datapages/HomeData.js'
import Display from '../../../components/molecules/Display.jsx'
import VehicleCard from '../../../components/molecules/VehicleCard.jsx'

import { vanish } from '../../../hooks/Vanish.js'
import LoadingScreen from '../../../components/organisms/LoadingScreen.jsx'
import Spinner from '../../../components/atoms/Spinner.jsx'

function Home({ onReady }) {
  const navigate = useNavigate()

  const {
    marcas,
    paisesOrigen,
    ultimosVehiculos,
    loadingMarcas,
    errorMarcas,
    loadingPaises,
    errorPaises,
    loadingUltimos,
    errorUltimos,
    selectedBrandId,
    selectedCountryId,
    handleBrandSelect,
    handleCountrySelect,
  } = useHomeData()

  const safeMarcas = Array.isArray(marcas) ? marcas : []
  const safePaises = Array.isArray(paisesOrigen) ? paisesOrigen : []
  const safeVehiculos = Array.isArray(ultimosVehiculos) ? ultimosVehiculos : []

  const showSplash = false

  const loadingGlobal = loadingMarcas || loadingPaises || loadingUltimos

  useEffect(() => {
    if (!loadingGlobal && typeof onReady === 'function') {
      onReady()
    }
  }, [loadingGlobal, onReady])

  //if (showSplash) return <LoadingScreen fadeOut={fadeOut} />

  // Navegación usando filtros
  const handleBrandClick = (id, item) => {
    handleBrandSelect(id, item)
    navigate('/catalogo', { state: { marcaId: id } })
  }

  const handleCountryClick = (id, item) => {
    handleCountrySelect(id, item)
    navigate('/catalogo', { state: { paisId: id } })
  }

  return (
    <div className="container my-5">
      {/* SLOGAN */}
      <section className="my-4">
        <Display
          title="Conduce tu futuro digital."
          subtitle="Explora marcas, países de origen y experiencias hechas para quienes avanzan sin mirar atrás."
        />
      </section>

      {/* VEHÍCULOS RANDOM (4 CARDS) */}
      <section className="my-5">
        <h2 className="mb-3">Vehículos Interesantes</h2>

        {loadingUltimos && (
          <div className="d-flex flex-column align-items-center my-4">
            <Spinner className="text-light mb-2" />
            <p className="text-light mb-0">Cargando vehículos...</p>
          </div>
        )}

        {!loadingUltimos && errorUltimos && (
          <p className="text-danger">
            Ocurrió un error al cargar los vehículos.
          </p>
        )}

        {!loadingUltimos && !errorUltimos && safeVehiculos.length === 0 && (
          <p>No hay vehículos registrados aún.</p>
        )}

        {!loadingUltimos && !errorUltimos && safeVehiculos.length > 0 && (
          <div className="row">
            {safeVehiculos.map((vehiculo) => (
              <div
                className="col-12 col-md-6 col-lg-3 mb-4"
                key={vehiculo.id}
              >
                <VehicleCard vehiculo={vehiculo} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FILTRO POR MARCAS */}
      {!loadingMarcas && !errorMarcas && safeMarcas.length > 0 && (
        <section className="my-5">
          <IconGridSection
            title="Filtrar por marca"
            subtitle="Selecciona una marca para explorar vehículos disponibles."
            items={safeMarcas}
            selectedId={selectedBrandId}
            onSelect={handleBrandClick}
            getKey={(m) => m.id}
            getLabel={(m) => m.nombre}
            getImage={(m) => m.imagenMarca}
            showFilter={true}
          />
        </section>
      )}

      {/* FILTRO POR PAÍS DE ORIGEN */}
      {!loadingPaises && !errorPaises && safePaises.length > 0 && (
        <section className="my-5">
          <IconGridSection
            title="Filtrar por país de origen"
            subtitle="Explora los vehículos según su país de fabricación."
            items={safePaises}
            selectedId={selectedCountryId}
            onSelect={handleCountryClick}
            getKey={(p) => p.id}
            getLabel={(p) => p.nombre}
            getImage={(p) => p.imagenPaisOrigen}
            showFilter={true}
          />
        </section>
      )}

      <VisitUsSection />
    </div>
  )
}

export default Home
