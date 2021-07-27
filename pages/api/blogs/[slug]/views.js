import supabase from '@/lib/supabase'
import { logRequest } from '@/lib/logger'

export default function handler(req, res) {
  logRequest(req, res)

  if (req.method === 'GET') {
    return getBlogViewsCount(req, res)
  }
  if (req.method === 'POST') {
    return incrementBlogViewsCount(req, res)
  }
}

async function getBlogViewsCount(req, res) {
  try {
    const { slug } = req.query

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('views')
      .eq('slug', slug)
      .single()

    if (error) throw error

    const views = blog?.views || 1
    return res.status(200).json({ views })
  } catch (error) {
    error.origin = 'getBlogViewsCount'
    res.error = error
    res.status(error.status || 500).json({ error: true })
  }
}

async function incrementBlogViewsCount(req, res) {
  try {
    const { slug } = req.query

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('views')
      .eq('slug', slug)
      .single()

    if (error) throw error

    const views = blog?.views + 1
    const { error: updateError } = await supabase
      .from('blogs')
      .update({ views })
      .eq('slug', slug)

    if (updateError) throw updateError

    return res.status(200).json({ views })
  } catch (error) {
    error.origin = 'incrementBlogViewsCount'
    res.error = error
    return res.status(500).json({ error: true })
  }
}
