import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default function useRelatedBlogs(slug, tags) {
  const tagsQuery = tags.join(',')

  const { data, error } = useSWR(`/api/blogs?tags=${tagsQuery}&limit=4`, {
      fetcher,
      revalidateOnMount: true,
      initialData: { blogs: null },
  })

  return {
    relatedArticles: data?.blogs?.filter((blog) => blog.slug !== slug),
    isLoading: !error && !data?.blogs,
    error,
  }
}
