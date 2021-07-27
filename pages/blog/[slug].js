import React, { useEffect } from 'react'
import Head from 'next/head'
import Blog from '@/components/blogpost'
import BlogpostLikes from '@/components/blogpostLikes'
import BlogRelateds from '@/components/blogRelateds'
import useViews from '@/hooks/useViews'
import useRelatedBlogs from '@/hooks/useRelatedBlogs'
import config from '@/config'
import Api from '@/lib/apiCaller'
import { getBlogs, getBlogBySlug } from '@/lib/content'
import storeOrUpdateBlog from '@/lib/store'

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
        <meta name='og:site_name' content='Many Osorio' />
        <meta name='og:url' content={`${config.BASE_URL}/blog/${slug}`} />
        <meta name='og:type' content='website' />
        <meta name='og:title' content={`${title} - Many Osorio`} />
        <meta name='og:description' content={summary} />
        {image?.source && <meta name='og:image' content={image.source} />}
        {image?.source && <meta name='og:image:height' content='540' />}
        {image?.source && <meta name='og:image:width' content='540' />}
        {image?.source && <meta name='og:type' content={`image/${image.source.split('.')[1]}`} />}
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
    revalidate: false,
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
