import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

const STORAGE_KEY = 'km_cart'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (vehiculo) => {
    setCart((prev) => {
      const exists = prev.some((v) => v.id === vehiculo.id)
      if (exists) return prev
      return [...prev, vehiculo]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((v) => v.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
