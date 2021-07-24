import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useLikes(slug) {
  const { data, error } = useSWR(`/api/blogs/${slug}/likes`, {
    fetcher,
    initialData: { likes: 0 },
    refreshInterval: 1000 * 10, // Each 10 seconds
  })

  return {
    likes: data?.likes,
    isLoading: !data?.likes && !error,
    error,
  }
}
