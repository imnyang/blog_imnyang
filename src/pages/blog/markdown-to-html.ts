import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default function markdownToHTML(markdownText) {
  return md.render(markdownText);
}
