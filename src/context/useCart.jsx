import { useContext } from 'react'
import { CartContext } from './CartContextValue.js'

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart debe usarse dentro de un CartProvider')
    return ctx
}
