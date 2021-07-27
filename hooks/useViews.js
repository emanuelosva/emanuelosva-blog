import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useViews(slug) {
  const { data, error } = useSWR(`/api/blogs/${slug}/views`, {
    fetcher,
    initialData: { views: undefined },
  })

  return {
    views: data?.views,
    isLoading: data?.views === undefined && !error,
    error,
  }
}
