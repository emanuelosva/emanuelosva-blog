import marked from 'marked'

export default function markdownToHtml(mkd) {
  return marked(mkd, {
    renderer: new marked.Renderer(),
    highlight: function highlight(code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
}
