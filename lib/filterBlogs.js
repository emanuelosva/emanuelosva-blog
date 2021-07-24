export default function filterBlogs(blogs, search) {
  const matchBlogs = blogs.filter((blog) => {
    const inTags = blog
      .tags?.filter((tag) => tag.includes(search))
      ?.length

    const inTitle = blog.title.toLowerCase().includes(search)
    return inTitle || inTags
  })

  return matchBlogs
}
