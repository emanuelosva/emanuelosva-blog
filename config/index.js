const config = {
  isProduction: process.env.NODE_ENV === 'production',

  BASE_URL: 'https://emanuelosva.vercel.app',
  SITE_TITLE: 'Blog - Many Osorio',
  SITE_NAME: 'Many Osorio',
  /** @TODO create og and seo description */
  SEO_DESCRIPTION: 'Programming, nodejs, backend, frontend',
  SEO_KEY_WORDS: 'many osorio, emanuel osorio, emanuelosva, aprender programación, software developer',
  BLOG_DESCRIPTION: 'Opinion, tutorials and discussions about software development.',

  TAGS: ['nodejs', 'backend', 'frontend', 'database', 'tutorials', 'life', 'self-growth', 'business'],

  AUTHOR_ID: '9d52c604-c8bc-4a11-9547-27c1f4e7e9a0',
}

export default config
