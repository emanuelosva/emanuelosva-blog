export default async function fetcher(...params) {
  const res = await fetch(...params)
  return res.json()
}
