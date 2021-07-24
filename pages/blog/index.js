import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import config from '@/config'
import BlogsSearch from '@/components/blogsSearcher'
import BlogList from '@/components/blogsList'
import filterBlogs from '@/lib/filterBlogs'
import { getBlogsMetadata } from '@/lib/content'

export default function Blog({ blogs }) {
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
        <p>Hi, Im many...</p>
        <BlogsSearch handleChange={handleChange} />
        {!isSearching() && (
          <>
            <h2>Most Popular</h2>
            <BlogList blogs={blogs} />
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
  return {
    props: { blogs },
    revalidate: 3600 * 24, // Each 1 day
  }
}
