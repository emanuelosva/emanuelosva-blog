export default function formatDateToString(date) {
  const fullDate = new Date(date)
  const [, month, day, year] = fullDate.toString().split(' ')

  return `${day} ${month} ${year}`.toUpperCase()
}
