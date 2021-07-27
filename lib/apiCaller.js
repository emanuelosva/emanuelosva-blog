import fetcher from '@/lib/fetcher'


const Api = {
  incrementLikes: async (slug) => wrapApiCall(
    fetcher, `/api/blogs/${slug}/likes`, { method: 'POST' }
  ),
  incrementViews: async (slug) => wrapApiCall(
    fetcher, `/api/blogs/${slug}/views`, { method: 'POST' }
  ),
}

export default Api

async function wrapApiCall(_fetcher, url, config = {}) {
  try {
    const data = await _fetcher(url, config)
    return { data, error: undefined }
  } catch (error) {
    console.error(`Error on fetch to: ${config?.method || 'GET'} - ${url}`)
    return { data: undefined, error }
  }
}
