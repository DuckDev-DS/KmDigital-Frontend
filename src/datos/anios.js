// Genera una lista de años desde el año actual hacia atrás
export const ANIOS = (() => {
  const currentYear = new Date().getFullYear()
  const cantidad = 10 // últimos 10 años
  return Array.from({ length: cantidad }).map((_, idx) => {
    const year = currentYear - idx
    return { id: year, nombre: year.toString() }
  })
})()
