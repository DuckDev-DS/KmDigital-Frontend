import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'km_cart'

export function CartProvider({ children }) {
  // Estado inicial: intenta leer desde localStorage
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      console.error('Error leyendo carrito desde localStorage:', err)
      return []
    }
  })

  // Sincronizar con localStorage cada vez que cambie el carrito
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch (err) {
      console.error('Error guardando carrito en localStorage:', err)
    }
  }, [cart])

  const addToCart = (vehiculo) => {
    setCart((prev) => {
      // Regla: solo 1 auto de cada id
      const exists = prev.some((v) => v.id === vehiculo.id)
      if (exists) return prev
      return [...prev, vehiculo]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((v) => v.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
