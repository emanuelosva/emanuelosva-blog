import React, { useEffect } from 'react'
import Head from 'next/head'
import Blog from '@/components/blogpost'
import BlogpostLikes from '@/components/blogpostLikes'
import BlogRelateds from '@/components/blogRelateds'
import useViews from '@/hooks/useViews'
import useRelatedBlogs from '@/hooks/useRelatedBlogs'
import config from '@/config'
import Api from '@/lib/apiCaller'
import { getBlogs, getBlogBySlug, storeOrUpdateBlog } from '@/lib'

export default function BlogPage({
  slug,
  title,
  image,
  publishedAt,
  summary,
  author,
  minutesToRead,
  tags,
  htmlSource,
}) {
  const { views } = useViews(slug)
  const { relatedArticles, isLoading: isRelatedLoading } = useRelatedBlogs(slug, tags)

  useEffect(() => config.isProduction && Api.incrementViews(slug), [slug])

  return (
    <>
      <Head>
        <title>{title} - Many Osorio</title>
        <meta name='description' content={summary}/>
        {/* Open Grpah */}
        <meta name='og:site_name' content='Many Osorio' />
        <meta name='og:url' content={`${config.BASE_URL}/blog/${slug}`} />
        <meta name='og:type' content='blog' />
        <meta name='og:title' content={`${title} - Many Osorio`} />
        <meta name='og:description' content={summary} />
        <meta name='og:image' content={image.source} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={image.description} />
        {/* Twiter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Many Osorio`} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:url" content={`${config.BASE_URL}/blog/${slug}`} />
        <meta name="twitter:image" content={image.source} />
      </Head>

      <Blog
        title={title}
        publishedAt={publishedAt}
        author={author}
        minutesToRead={minutesToRead}
        views={views}
        htmlSource={htmlSource}
        image={image}
      />

      <BlogpostLikes slug={slug}/>
      <BlogRelateds blogs={relatedArticles} isLoading={isRelatedLoading} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return { notFound: true }
  }

  await storeOrUpdateBlog(blog)

  return {
    props: blog,
    revalidate: 3600 * 24, // refresh each one day
  }
}

export async function getStaticPaths() {
  const posts = getBlogs()
  const paths = posts.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
