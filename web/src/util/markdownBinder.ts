import Markdown from 'markdown-it'

export default function renderMarkdown($element: HTMLElement, id: string, source: string) {
  const md = new Markdown({
    breaks: true,
  })
  $element.querySelector(`#${id}`).innerHTML = md.render(source)
}
