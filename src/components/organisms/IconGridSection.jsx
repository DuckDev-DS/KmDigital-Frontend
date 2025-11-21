import React, { useRef, useEffect } from 'react'
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
  showFilter = true,
}) {
  const trackRef = useRef(null)

  const handleSelect = (id, item) => {
    if (onSelect) {
      onSelect(id, item)
    }
  }

  const scroll = (direction = 'right') => {
    if (!trackRef.current) return
    const track = trackRef.current
    const amount = 220 // ancho aproximado de una card

    if (direction === 'right') {
      const maxScroll = track.scrollWidth - track.clientWidth
      const next = track.scrollLeft + amount

      if (next >= maxScroll) {
        track.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        track.scrollBy({ left: amount, behavior: 'smooth' })
      }
    } else {
      const next = track.scrollLeft - amount
      track.scrollTo({ left: next < 0 ? 0 : next, behavior: 'smooth' })
    }
  }

  // Carrusel automático: 1 card a la derecha cada 1.5 segundos
  useEffect(() => {
    if (!items || items.length === 0) return

    const intervalId = setInterval(() => {
      scroll('right')
    }, 1500)

    return () => clearInterval(intervalId)
  }, [items])

  return (
    <section className="brand-section">
      <div className="brand-section-header">
        <div className="brand-section-title-block">
          <h2 className="brand-section-title">{title}</h2>
          {subtitle && (
            <p className="brand-section-subtitle">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="brand-carousel-wrapper">
        <button
          type="button"
          className="brand-carousel-arrow brand-carousel-arrow--left"
          onClick={() => scroll('left')}
          aria-label="Desplazar marcas a la izquierda"
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
          aria-label="Desplazar marcas a la derecha"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default IconGridSection
