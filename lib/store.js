import supabase from '@/lib/supabase'
import logger from '@/lib/logger'
import config from '@/config'

export default async function storeOrUpdateBlog({
  slug,
  title,
  tags,
  publishedAt,
  summary,
  image,
  minutesToRead,
  numberOfWords,
  htmlSource,
}) {
  const isBlogStored = await getStoredBlog(slug)

  if (isBlogStored) {
    updateStoredBlog(
      { slug, title, tags, publishedAt, summary, image, minutesToRead, numberOfWords, htmlSource }
    )
  } else {
    insertNewBlog(
      { slug, title, tags, publishedAt, summary, image, minutesToRead, numberOfWords, htmlSource }
    )
  }
}

async function getStoredBlog(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug')
    .eq('slug', slug)


  if (error) throw error

  return data[0]
}

async function insertNewBlog(blog) {
  try {
    const { error, data } = await supabase
      .from('blogs')
      .insert([{ ...blog }])

    if (error) throw error

    logger.info(`Blog iserted: ${blog.slug}`, { data })
  } catch (error) {
    logger.error(`Error on insertNewBlog: ${error.message}`, { error, blog })
    throw error
  }
}

async function updateStoredBlog(blog) {
  try {
    const { error, data } = await supabase
      .from('blogs')
      .update({ ...blog })
      .eq('slug', blog.slug)

    if (error) throw error

    logger.info(`Blog updated: ${blog.slug}`, { data })
  } catch (error) {
    logger.error(`Error on updateStoredBlog: ${error.message}`, { error, blog })
    throw error
  }
}
