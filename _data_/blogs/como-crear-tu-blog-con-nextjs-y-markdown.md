---
title: Como crear un blog con next js y markdown
date: 2021-07-22
summary: Crea tu propio Blog con next + markdown y comienza a compartir tus ideas con el mundo.
tags:
  - nodejs
  - tutorials
  - frontend
image:
  source: https://emanuelosva-blog-images.s3.amazonaws.com/nextjs-markdonw-blog.png
  description: (Nextjs + MD Blog)
author:
  name: Many Osorio
  image: /assets/author-image.png
---

En un mundo de comunicación remota como en el que vivimos hoy, escribir es una habilidad fundamental. Tú me dirás que la mayoría lo sabemos hacer, pero hay una brecha gigante entre solo escribir y hacerlo con eficacia.

Escribir con eficacia es poder **darnos a entender** ante otros de una manera clara, ordenada y de ser posible resumida.

No hay nada mejor para mejorar nuestras habilidades que practicar, así que aquí te comparto como puedes aprovechar [next-js](https://nextjs.org/) para construir tu blog de manera sencilla y comenzar a compartir tus ideas y conocimientos al mundo.

## El objetivo

Construir un blog haciendo uso de next js y algunas otras librerías, en el cual podrás escribir tus posts en formato markdown y se traducirán en páginas HTML que todos podrán visitar en línea.

## Requisitos

Aunque el proceso es muy sencillo, necesitas al menos lo siguiente:

- [git](https://git-scm.com/) y [nodejs](https://nodejs.org/es/) instalados
- Conocimientos básicos de Javascript, css, Ract, Next js y markdown

## Primeros pasos

### Inicialización del proyecto

Primero inicia un proyecto básico de Next, si tienes experiencia puedes hacerlo desde cero o bien, ayudarte con el comando:

```sh
# Init project

npx create-next-app blog
# or
yarn create next-app blog
```

Tu proyecto se verá algo así:

```sh
- blog
  |-- pages
  |-- public
  |-- styles
  |-- .eslintrc
  |-- .gitignore
  |-- next.config.js
  |-- package.json
  |-- REAMED.md
  |-- yarn.lock
```

Necesitaremos dos directorios extras: 
- `lib` que será donde vivirá la lógica para manejar los blogposts y 
- `_blogs_`, el lugar donde crearás cada uno de tus posts en formato markdown.

```sh
mkdir lib
mkdir _blogs_
```

Desde aquí asumiré que tienes un poco de conocimiento en el framewrok, si no es así puedes seguir la [guía oficial](https://nextjs.org/docs/getting-started).


### Dependencias

Estas son las dependencias clave que necesitamos para leer los archivos `.md`, transformarlos y darles estilos para que puedan ser renderizados por el navegador:

- [gray-matter](https://www.npmjs.com/package/gray-matter): Nos ayudará a leer el contenido de los markdown y obtener metadata de ellos como: título, fecha, tags, etc.
- [marked](https://www.npmjs.com/package/marked): Será con lo que convertiremos el texto markdown en Html.
- [highlight.js](https://www.npmjs.com/package/highlight.js): Nos servirá para dar estilos a bloques de código que pongamos dentro de los posts.
- [reading-time](https://www.npmjs.com/package/reading-time): Nos dará una estimación del tiempo de lectura de cada post que creémos.

Instalación:

```sh
yarn add gray-matter marked highlight.js reading-time
```

## Transformando markdown en Html

Pongamos como punto de partida el siguiente post en markdown:

```md
---
title: My blog title
slug: my-blog-title-intro
summary: An awesome summary.
tags:
  - javascript
  - nodejs
image:
  source: https://image-url.png
  description: image-alt-description
author:
  name: Stan Lee
  image: /assets/stan-lee.png
publishedAt: 2021-07-22
---

Some introduction...

## A subtitle
More text...

A list:
- Item_1
- Item_2

## A Subtitle 2
Conclusion text...
```

La metadata es la parte que se encuentra entre líneas:

```md
---
title: My blog title
...
---
```

Son propiedades extras y *ocultas* que le podemos asignar a cada blog en formato [yml](https://geekflare.com/es/yaml-introduction/).

El resto es el contenido del post, lo que será renderizado en el navegador y tus lectores podrán ver.

Comencemos separando la metadata del contenido. Para ello usaremos la librería `gray-matter`

```js
import matter from 'gray-matter'

const source = fs.readFyleSync(pathToBlog, 'utf8')
const { data, content } = matter(source)
```

Cada una de las propiedades se verían así (tomando como ejemplo el blog de test de arriba):

```js
// data
{
  title: 'My blog title',
  slug: 'my-blog-title-intro',
  summary: 'An awesome summary.',
  tags: ['javascript', 'nodejs'],
  image: {
    source: 'https://image-url.png',
    description: 'image-alt-description',
  },
  author: {
    name: 'Stan Lee',
    image: '/assets/stan-lee.png',
  },
  publishedAt: '2021-07-22'
}
```
```js
// content

"Some introduction...\n## A subtitle\nMore text...\nA list:..."
```

Vemos que la metadata, nombrada como `data` es un json de la información asociada al post, mientras que el `content` es la versión en string del contenido.

Ahora, ¿cómo transformamos ese string en un `Html` que pueda ser renderizado por el navegador?. Bien, aquí entra en juego la librería `marked`, la cual hace esta tarea de maravilla:

```js
import matter from 'gray-matter'
import marked from 'marked'

const source = fs.readFyleSync(pathToBlog, 'utf8')
const { data, content } = matter(source)
const html = markdownToHtml(content)

function markdownToHtml(mkd) {
  return marked(mkd, {
    renderer: new marked.Renderer(),
    highlight: function highlight(code, lang) {
      const hljs = require('highlight.js'); // <-- This helps to add styles to code inside md files.
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
}
```

El resultado sería algo así:

```js
// html

`
<p>Some introduction...</p>
<h2>A subtitle</h2>
<p>More text...</p>
<p>A list:</p>
<ul>
  <li>Item_1</li>
  ...
</ul>
...
`
```

Podemos agregar un detalle opcional, que es el tiempo de lectura aproximado de cada post, para hacerlo podemos hacer uso de la librería *reading-time*:

```js
import matter from 'gray-matter'
import marked from 'marked'
import readingTime from 'reading-time'

const source = fs.readFyleSync(pathToBlog, 'utf8')
const { data, content } = matter(source)
const { minutes } = readingTime(content)
```

Bien, ya tenemos una forma de pasar de markdown a un html, ahora, veamos cómo trabajaría todo esto en conjunto para usarlo dentro de nuestro frontend en next js:

```js
// lib/content.js

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import readingTime from 'reading-time'

// The real path to blogs directory
const DATA_ROOT = path.join(process.cwd(), '_blogs_')

// Find all post slugs
// Useful to use getStaticPaths in next to
// prebuild all html blogs (Improves response time and SEO)
export function getBlogSlugs() {
  const allPaths = fs.readFileSync(DATA_ROOT)
  const slugs = allPaths.map((path) => {
    const { data } = getBlogData(path, { withContent = false })
    return data.slug
  })
  return slugs
}

// Get all blogs metadata and content
export function getAllBlogs() {
  const allPaths = fs.readFileSync(DATA_ROOT)
  const blogs = allPaths.map((path) => {
    const { data, html } = getBlogData(path)
    return { html, ...data }
  })
  return blogs
}

// Get blog content and metadata
export function getBlogData(relativePath, { withContent = true } = {}) {
  const source = fs.readFileSync(
    path.join(DATA_ROOT, relativePath),
    'utf8'
  )

  const { data, content } = matter(source)
  const { minutes } = readingTime(content)

  // If we want, we can get only data and don't wait the html parse
  let html = ''
  if (withContent) {
    html = markdownToHtml(content)
  }

  return { html, data: { ...data, minutesToRead: minutes } }
}

function markdownToHtml(mkd) {
  return marked(mkd, {
    renderer: new marked.Renderer(),
    highlight: function highlight(code, lang) {
      const hljs = require('highlight.js'); // <-- This helps to add styles to code inside md files.
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
}
```

Ahora tenemos una manera simple de obtener todo nuestro contenido para verterlo dentro de nuestro proyecto frontend.

No quiero limitar tu creatividad, así que solo te compartiré la lógica necesaria para generar todas las páginas de posts de manera estática y tú podrás crear tu propio diseño a tu preferencia.

### Generación de posts estáticos

Dentro de `pages`crearemos nuestras rutas al blog, teniendo la ruta dinámica `[slug]` que será el identificador único de cada posts, así cada una de tus entradas tendrá una url del tipo: `https://your_site.com/blog/post-slug`:

```sh
- blog
  |-- pages
      |-- index.js <-- El home de tu sitio (Opcional)
      |-- blog
          |-- index.js <-- La página principal del blog
          |-- [slug].js <-- La ruta dinámica de cada post
  |-- public
  |-- styles
  |-- .eslintrc
  |-- .gitignore
  |-- next.config.js
  |-- package.json
  |-- REAMED.md
  |-- yarn.lock
```

Dentro del index de `blog` podemos mostrar cards con links a todos tus posts, puedes usar algo como lo siguiente:

```js
// pages/blog/index.js

import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import BlogCard from '@/components/blogsList'
import Container from '@/components/container'
import { getAllBlogs } from '@/lib/content'

export default function Blog({ blogs }) {
  return (
    <>
      <Head>
        <title>Blog - Your_name</title>
        <meta name='description' content='Seo description' />
        <meta name='og:site_name' content='Blog - Your_name' />
        <meta name='og:url' content='https://your_site.com' />
        <meta name='og:type' content='website' />
        <meta name='og:title' content='Your_og_title' />
        <meta name='og:description' content='Your_og_description' />
      </Head>
      <h1>Blog</h1>
      <p>Tell us about yourself</p>
      <Container>
        {blogs.map((blog) => <BlogCard blog={blog} />)}
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const blogs = getAllBlogs()

  return {
    props: { blogs }
  }
}

```

En el ejemplo anterior la función `getStaticProps` se ejecuta en tiempo de `build`. Al construirse tu proyecto se guarda en formato json todo la data generada por `getAllBlogs` (html y metadata de cada blog que tengas en la carpeta `_blogs_`).
De esta manera en cada request, este json se inyecta como `props` a tu componente de **React** obteniendo una velocidad de carga sumamente rápida sin la necesidad de consultar una API externa. Claro, su desventaja es que si quieres modificar un blog, no lo puedes hacer dinámicamente, tendrías que hacer todo un nuevo deploy, pero bueno, es el precio a pagar por la facilidad de poner en producción tu contenido.


Ahora, para generar cada post trabajaremos en `pages/blog/[slug].js`:

```js
// pages/blog/[slug].js

import React from 'react'
import Head from 'next/head'
import Blog from '@/components/blogpost'
import { getBlogSlugs, getBlogData } from '@/lib/content'

export default function BlogPage({
  slug,
  title,
  image,
  publishedAt,
  summary,
  author,
  minutesToRead,
  tags,
  html,
}) {
  return (
    <>
      <Head>
        <title>{title} - Your_name</title>
        <meta name='description' content={summary}/>
        <meta name='og:site_name' content='Your site name' />
        <meta name='og:url' content={`your_site_name/blog/${slug}`} />
        <meta name='og:type' content='website' />
        <meta name='og:title' content={`${title} - Your_name`} />
        <meta name='og:description' content={summary} />
        <meta name='og:image' content={image.source} />
        <meta name='og:image:height' content='256' />
        <meta name='og:image:width' content='540' />
        <meta name='og:type' content={`image/${image.source.split('.')[1]}`} />
      </Head>

      <Blog
        title={title}
        publishedAt={publishedAt}
        author={author}
        minutesToRead={minutesToRead}
        htmlSource={html}
        image={image}
        tags={tags}
      />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  // Your slug must be the same as your post file name
  const blog = getBlogBySlug(`${getBlogData}.md`)

  if (!blog) {
    return { notFound: true }
  }

  return {
    props: blog,
    revalidate: false, // <-- It tells to next that the data is static
  }
}

export async function getStaticPaths() {
  const posts = getBlogSlugs()
  const paths = posts.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
```

En este caso `getStaticPaths` genera todas las rutas a cada uno de nuestros posts, es decir que si dentro del directorio `_blogs_` tenemos 3, llamados: ***blog-1.md***, ***blog-2.ms*** y ***blog-1.md***

Estarán disponibles dentro de nuestro sitio las urls:

- /blog/blog-1
- /blog/blog-2
- /blog/blog-3

Cualquier otra ruta /blog/* tendrá una respuesta 404 (Not found).

Como en la parte del index de blogs, `getStaticProps` genera las `props` de cada uno de los paths generados, es decir que, cuando alguien entre a ***/blog/blog-1*** se inyectará dentro del componente como props el título, tags, html, etc, del blog específico, incrementado así la velocidad de respuesta.

Como dije antes, este post se limita a compartirte la forma en que puedes cargar todos los datos de tu blog. El diseño te lo dejo a ti para que imprimas todo tu estilo, gustos y personalidad en él.
Aún así, si quieres ver el cémo está construido este blog, con todo gusto lo comparto contigo [aquí](https://github.com/emanuelosva/emanuelosva-blog).


## Conclusión

Espero que esta guía te sirva como una base para comenzar tu propio blog o bien el de tu marca o empresa.
Práctica el comunicarte claramente, es un skill cada vez más demandado en un mundo de trabajo remoto, (yo lo estoy haciendo justo hora al compartirte estas palabras). Así que no esperes más, ya sea porque hay algo que tienes que decirle al mundo o simplemente por diversión comienza a compartir tus ideas, te puede sorprender a donde puedes llegar.
