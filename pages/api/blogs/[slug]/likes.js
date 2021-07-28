import supabase from '@/lib/supabase'
import { logRequest } from '@/lib/logger'

export default function handler(req, res) {
  logRequest(req, res)

  if (req.method === 'GET') {
    return getBlogLikesCount(req, res)
  }
  if (req.method === 'POST') {
    return incrementBlogLikesCount(req, res)
  }
}

async function getBlogLikesCount(req, res) {
  try {
    const { slug } = req.query

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('likes')
      .eq('slug', slug)
      .single()

    if (error) throw error

    const likes = blog?.likes || 1

    return res.status(200).json({ likes })
  } catch (error) {
    error.origin = 'getBlogLikesCount'
    res.error = error
    return res.status(500).json({ error: true })
  }
}

async function incrementBlogLikesCount(req, res) {
  try {
    const { slug } = req.query

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('likes')
      .eq('slug', slug)
      .single()

    if (error) throw error

    const likes = blog?.likes + 1
    const { error: updateError } = await supabase
      .from('blogs')
      .update({ likes })
      .eq('slug', slug)

    if (updateError) throw updateError

    return res.status(200).json({ likes })
  } catch (error) {
    error.origin = 'incrementBlogLikesCount'
    res.error = error
    return res.status(500).json({ error: true })
  }
}
