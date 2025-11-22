import { useCart } from '../../../context/CartContext.jsx'

export function useCarritoData() {
  const { cart, removeFromCart, clearCart } = useCart()

  // Calcular total
  const total = cart.reduce((acc, v) => {
    const precioNum = Number(v.precio)
    if (Number.isNaN(precioNum)) return acc
    return acc + precioNum
  }, 0)

  return {
    cart,
    removeFromCart,
    clearCart,
    total,
  }
}
