import React from 'react'
import '../../styles/components/organisms/FilterPanel.css'

function FilterPanel({ marcas, filters, onChange, onClear }) {
  return (
    <aside className="filter-panel">
      <div className="filter-panel-card">
        <h2 className="filter-panel-title">Filtros</h2>

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

        <div className="mb-3">
          <label className="form-label filter-label">Marca</label>
          <select
            className="form-select"
            value={filters.marcaId}
            onChange={(e) => onChange('marcaId', e.target.value)}
          >
            <option value="">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label filter-label">Precio mínimo</label>
            <input
              type="number"
              className="form-control"
              value={filters.precioMin}
              onChange={(e) => onChange('precioMin', e.target.value)}
              placeholder="0"
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
