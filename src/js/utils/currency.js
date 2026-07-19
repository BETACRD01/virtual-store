export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '$0.00'
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(amount)
}

export function calculateDiscount(price, offerPrice) {
  if (!price || !offerPrice || offerPrice >= price) return 0
  return Math.round(((price - offerPrice) / price) * 100)
}
