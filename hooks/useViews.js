import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useViews(slug) {
  const { data, error } = useSWR(`/api/blogs/${slug}/views`, {
    fetcher,
    initialData: 0,
    refreshInterval: 1000 * 60, // Each 1 minute
  })

  return {
    views: data?.views,
    isLoading: !data && !error,
    error,
  }
}
