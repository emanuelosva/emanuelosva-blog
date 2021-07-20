export default function formateDateToString(date) {
  const fullDate = new Date(date)
  const [, month, day, year] = fullDate.toString().split(' ')

  return `${month} ${day}, ${year}`
}
