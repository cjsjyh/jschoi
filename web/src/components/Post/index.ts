import { JSXstrToHTML } from '@web/util/jsxParser'

const data = {
  title: 'this is my title',
  content: 'this is my content',
  createdAt: new Date(),
}

interface Props {
  $parent: HTMLElement
}

export default class Post {
  constructor({ $parent }: Props) {
    console.log('constructor')
    JSXstrToHTML($parent, this.render())
  }

  render = () => `
    <div>
      <p>${data.title}</p>
      <p>${data.content}</p>
      <p>${data.content}</p>
    </div>
  `
}
