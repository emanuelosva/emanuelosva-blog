import { supabase, logRequest } from '@/lib'

export default function handler(req, res) {
  logRequest(req, res)

  if (req.method === 'GET') {
    return getBlogs(req, res)
  }
}


async function getBlogs(req, res) {
  try {
    const {
      tags: strTags,
      sortBy = 'views',
      sort = 'DES',
      limit = 10,
    } = req.query

    const tags = strTags.replace(/\s/g, '').split(',')

    const { data, error } = await supabase
      .from('blogs')
      .select(`
        slug,
        title,
        tags,
        views,
        image,
        publishedAt,
        summary,
        minutesToRead,
        numberOfWords,
        author (name,image)
      `)
      .order(sortBy, { ascending: sort === 'ASC' })
      .overlaps('tags', tags)
      .limit(+limit)

    if (error) throw error

    res.json({ blogs: data })
  } catch (error) {
    res.origin = 'getBlogs'
    res.error = error
    res.status(error.status || 500).json({ error: true })
  }
}
