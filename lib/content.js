import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import markdownToHtml from '@/lib/markdownToHtml'

const ROOT = process.cwd()
const DATA_DIR = '_data_'
const DATA_ROOT = path.join(ROOT, DATA_DIR)

export const dataTypes = {
  blogs: 'blogs',
  snippets: 'snippets',
}

export function getBlogs() {
  const files = getFilesByType(dataTypes.blogs)
  const blogSlugs = files.map((filename) => filename.replace('.md', ''))

  return blogSlugs
}

export function getBlogsMetadata() {
  const blogSlugs = getBlogs()
  const blogsMetadata = blogSlugs.map((slug) => getBlogBySlug(slug, { withContente: false }))
  return blogsMetadata
}

export function getBlogBySlug(slug, { withContente = true } = {}) {
  const source = fs.readFileSync(path.join(DATA_ROOT, dataTypes.blogs, `${slug}.md`), 'utf8')

  if (!source) {
    if (process.env.NODE_ENV === 'production') return undefined
    throw new Error(`File with slug: ${slug} not found`)
  }

  const { data, content } = matter(source)
  const { title, date, tags, summary, author, image } = data

  const { minutes, words } = readingTime(content)

  let htmlCleanSource = ''
  if (withContente) {
    const htmlSource = markdownToHtml(content)
    htmlCleanSource = customizeHtml(htmlSource)
  }

  return {
    slug,
    title,
    tags,
    publishedAt: new Date(date).toISOString(),
    summary,
    image,
    author,
    minutesToRead: Math.round(minutes),
    numberOfWords: words,
    htmlSource: htmlCleanSource,
  }
}

function getFilesByType(type) {
  if (!Object.values(dataTypes).includes(type)) {
    throw new RangeError(`Invalid data type: ${type}`)
  }
  return fs.readdirSync(path.join(DATA_ROOT, type))
}

function customizeHtml(source) {
  let customizdeHtml = source

  customizdeHtml = repleceImgWithNextImage(customizdeHtml)
  customizdeHtml = replaceAnchorWithNoReferrerLinks(customizdeHtml)
  customizdeHtml = addInlineCodeClass(customizdeHtml)

  return customizdeHtml
}

function repleceImgWithNextImage(source) {
  return String(source).replace(/<img/g, '<Image')
}

function replaceAnchorWithNoReferrerLinks(source) {
  return String(source)
    .replace(/<a href="https/g, '<a target="_blank" rel="noopener noreferrer" href="https')
}

function addInlineCodeClass(source) {
  return String(source).replace(/<code>/g, '<code class="inline-code">')
}
