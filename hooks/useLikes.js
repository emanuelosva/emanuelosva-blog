import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useLikes(slug) {
  const { data, error } = useSWR(`/api/blogs/${slug}/likes`, {
    fetcher,
    initialData: { likes: 1 },
  })

  return {
    likes: data?.likes,
    isLoading: data?.likes === undefined && !error,
    error,
  }
}
