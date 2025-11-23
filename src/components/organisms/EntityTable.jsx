import React from 'react'
import Button from '../atoms/Button'
import '../../styles/components/organisms/EntityTable.css'

function EntityTable({ title, columns = [], data = [], onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return <p>No hay registros disponibles.</p>
  }

  // Primer map de columns para los headers
  // Segundo map de data para las filas
  // Tercero los botones de acciones
  return (
    <div className="entity-table">
      <h2 className="entity-table-title">{title}</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => {
                if (col === 'acciones') {
                  return (
                    <td key={`${item.id}-acciones`}>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => onEdit?.(item)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onDelete?.(item.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  )
                }
                const value = item[col]

                // Función para detectar el contenido de cada celda (si es null, array u objeto) se supone facilita la visualización de datos complejos.
                const renderValue = (v) => {
                  if (v === null || v === undefined) return ''
                  if (Array.isArray(v)) {
                    return v
                      .map((el) => (el && (el.nombre || el.toString())) || '')
                      .filter(Boolean)
                      .join(', ')
                  }
                  if (typeof v === 'object') {
                    return v.nombre ?? v.marca ?? v.id ?? JSON.stringify(v)
                  }
                  return v
                }

                return (
                  <td key={`${item.id}-${col}`}>{renderValue(value)}</td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EntityTable
