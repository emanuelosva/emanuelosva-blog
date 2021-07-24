import React from 'react'
import Head from 'next/head'
import Blog from '@/components/blogpost'
import BlogpostLikes from '@/components/blogpostLikes'
import useViews from '@/hooks/useViews'
import config from '@/config'
import { getBlogs, getBlogBySlug } from '@/lib/content'

export default function BlogPage({
  slug,
  title,
  image,
  publishedAt,
  summary,
  author,
  minutesToRead,
  htmlSource,
}) {
  const { views } = useViews(slug)

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
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return { notFound: true }
  }

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
