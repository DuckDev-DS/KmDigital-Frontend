// src/pages/user/pages2/Catalogo.jsx
import React from 'react'
import { useCatalogoData } from '../datapages/CatalogoData.js'

import SectionHeader from '../../../components/molecules/SectionHeader.jsx'
import FilterPanel from '../../../components/organisms/FilterPanel.jsx'
import CardGrid from '../../../components/organisms/CardGrid.jsx'

function Catalogo() {
  const {
    filteredVehiculos,
    marcas,
    loading,
    error,
    filters,
    handleFilterChange,
    clearFilters,
  } = useCatalogoData()

  return (
    <div className="catalog-page container my-5">
      <SectionHeader
        title="Explora el catálogo completo."
        subtitle="Filtra por marca, país de origen, precio o año y encuentra tu próximo vehículo."
      />

      <div className="row catalog-layout">
        <div className="col-12 col-md-3">
          <FilterPanel
            marcas={marcas}
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
          />
        </div>

        <div className="col-12 col-md-9">
          <CardGrid
            loading={loading}
            error={error}
            items={filteredVehiculos}
          />
        </div>
      </div>
    </div>
  )
}

export default Catalogo
