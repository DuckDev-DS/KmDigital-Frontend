import React, { useRef } from 'react'
import '../../styles/components/organisms/IconGridSection.css'

function IconGridSection({
  title,
  subtitle,
  items = [],
  selectedId,
  onSelect,
  getKey = (item) => item.id,             
  getLabel = (item) => item.label,        
  getImage = (item) => item.image,        
  showFilter = true,      //ocultar filtro                 
}) {
  const trackRef = useRef(null)

  const handleSelect = (id, item) => {
    if (onSelect) {
      onSelect(id, item)
    }
  }

  const scroll = (direction) => {
    if (!trackRef.current) return
    const amount = 300
    trackRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const handleSelectChange = (event) => {
    const value = event.target.value
    const id = value === '' ? '' : value
    const item = items.find((it) => String(getKey(it)) === String(id))
    handleSelect(id, item)
  }

  return (
    <section className="brand-section">
      <div className="brand-section-header">

        <div className="brand-section-title-block">
          <h2 className="brand-section-title">{title}</h2>
          {subtitle && (
            <p className="brand-section-subtitle">
              {subtitle}
            </p>
          )}
        </div>

        {showFilter && (
          <div className="brand-section-filter">
            <select
              className="brand-filter-select"
              value={selectedId || ''}
              onChange={handleSelectChange}
            >
              <option value="">Filtrar</option>
              {items.map((item) => {
                const id = getKey(item)
                const label = getLabel(item)
                return (
                  <option key={id} value={id}>
                    {label}
                  </option>
                )
              })}
            </select>
          </div>
        )}

      </div>

      <div className="brand-carousel-wrapper">
        <button
          type="button"
          className="brand-carousel-arrow brand-carousel-arrow--left"
          onClick={() => scroll('left')}
        >
          ‹
        </button>

        <div className="brand-carousel-track" ref={trackRef}>
          {items.map((item) => {
            const id = getKey(item)
            const label = getLabel(item)
            const img = getImage(item)

            return (
              <button
                key={id}
                type="button"
                className={
                  'brand-card' +
                  (String(selectedId) === String(id)
                    ? ' brand-card--active'
                    : '')
                }
                onClick={() => handleSelect(id, item)}
              >
                {img ? (
                  <img
                    src={img}
                    alt={label}
                    className="brand-card-logo"
                  />
                ) : (
                  <span className="brand-card-fallback">
                    {label?.charAt(0) || '?'}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="brand-carousel-arrow brand-carousel-arrow--right"
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default IconGridSection
