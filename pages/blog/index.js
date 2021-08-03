import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import config from '@/config'
import BlogsSearch from '@/components/blogsSearcher'
import BlogList from '@/components/blogsList'
import filterBlogs from '@/lib/filterBlogs'
import { supabase, getBlogsMetadata, logger } from '@/lib'

export default function Blog({ blogs, mostViewedBlogs }) {

  const [filteredBlogs, setFilteredBlogs] = useState(blogs)
  const [search, setSearch] = useState('')

  const isSearching = () => search !== ''

  const handleChange = useCallback((e) => {
    const actualSearch = String(e.target.value).toLowerCase()
    setSearch(actualSearch)

    const matchBlogs = filterBlogs(blogs, search)
    setFilteredBlogs(matchBlogs)
  }, [search, blogs])

  return (
    <>
      <Head>
        <title>Blog - Many Osorio</title>
        <meta name='description' content={config.SEO_DESCRIPTION} />
        <meta name='og:site_name' content={config.SITE_NAME} />
        <meta name='og:url' content={`${config.BASE_URL}/blog`} />
        <meta name='og:type' content='website' />
        <meta name='og:title' content={config.SITE_TITLE} />
        <meta name='og:description' content={config.BLOG_DESCRIPTION} />
      </Head>
      <>
        <h1>Blog</h1>
        <p style={{ marginBottom: '2rem', lineHeight: '1.5rem' }}>
          Hi, {"I'm"} Many. This space is dedicated to share with you thoughts on what {"I'm"} building and learning.
        </p>
        <BlogsSearch handleChange={handleChange} />
        {!isSearching() && (
          <>
            <h2>Most Popular</h2>
            <BlogList blogs={mostViewedBlogs} />
          </>
        )}
        <br />
        <h2>All posts</h2>
        <BlogList blogs={filteredBlogs} />
      </>
    </>
  )
}

export async function getStaticProps() {
  const blogs = getBlogsMetadata()

  const { data: mostViewedBlogs, error } = await supabase
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
    .order('views', { ascending: false })
    .limit(4)

  if (error) {
    logger.error(`Error on page.blogs.getStaticProps: ${error.message}`, { stack: error.stack , ...error })
    throw error
  }

  return {
    props: { blogs, mostViewedBlogs },
    revalidate: 3600 * 24 * 1, // Each 2 day
  }
}
