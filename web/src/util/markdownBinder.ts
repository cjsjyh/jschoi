import Markdown from 'markdown-it'

export default function renderMarkdown(
  $element: HTMLElement,
  id: string,
  source: string,
) {
  const md = new Markdown()
  $element.querySelector(`#${id}`).innerHTML = md.render(source)
}
