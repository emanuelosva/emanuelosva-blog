export default function filterBlogs(blogs, search) {
  const cleanSearch = search.trim().toLowerCase()

  const matchBlogs = blogs.filter((blog) => {
    const inTags = blog
      .tags?.filter((tag) => tag.includes(cleanSearch))
      ?.length

    const inTitle = blog.title.toLowerCase().includes(cleanSearch)
    return inTitle || inTags
  })

  return matchBlogs
}
