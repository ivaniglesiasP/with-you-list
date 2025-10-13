export const getFormattedDate = (date: string) =>
  new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export const isDateOlderThanOneHour = (dateString?: string | null): boolean => {
  if (!dateString) return false
  const currentDateTime = new Date(dateString).getTime()
  const now = Date.now()
  const diffHours = (now - currentDateTime) / (1000 * 60 * 60)
  return diffHours > 1
}

export const getCurrentISOStringDate = () =>
  new Date().toISOString().replace('T', ' ').replace('Z', '+00')
