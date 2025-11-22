import React from 'react'
import '../../styles/components/organisms/FilterPanel.css'

function FilterPanel({ marcas, paises, filters, onChange, onClear }) {
  return (
    <aside className="filter-panel">
      <div className="filter-panel-card">
        <h2 className="filter-panel-title">Filtros</h2>

        {/* Búsqueda rápida */}
        <div className="mb-3">
          <label className="form-label filter-label">Búsqueda rápida</label>
          <input
            type="text"
            className="form-control"
            value={filters.texto}
            onChange={(e) => onChange('texto', e.target.value)}
            placeholder="Ej: SUV, Hyundai, 2020…"
          />
        </div>

        {/* Filtro por marca */}
        <div className="mb-3">
          <label className="form-label filter-label">Marca</label>
          <select
            className="form-select"
            value={filters.marcaId}
            onChange={(e) => onChange('marcaId', e.target.value)}
          >
            <option value="">Todas las marcas</option>
            {marcas?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por país */}
        <div className="mb-3">
          <label className="form-label filter-label">País de origen</label>
          <select
            className="form-select"
            value={filters.paisId}
            onChange={(e) => onChange('paisId', e.target.value)}
          >
            <option value="">Todos los países</option>
            {paises?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtros de precio */}
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label filter-label">Precio mínimo</label>
            <input
              type="number"
              className="form-control"
              value={filters.precioMin}
              onChange={(e) => onChange('precioMin', e.target.value)}
              placeholder="1000000"
              min="0"
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label filter-label">Precio máximo</label>
            <input
              type="number"
              className="form-control"
              value={filters.precioMax}
              onChange={(e) => onChange('precioMax', e.target.value)}
              placeholder="5000000"
              min="0"
            />
          </div>
        </div>

        {/* Botón limpiar */}
        <button
          type="button"
          className="btn btn-outline-light w-100 filter-clear-btn"
          onClick={onClear}
        >
          Limpiar filtros
        </button>
      </div>
    </aside>
  )
}

export default FilterPanel
