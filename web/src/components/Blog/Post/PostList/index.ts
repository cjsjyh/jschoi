import { ComponentProps } from '@web/types'

import BaseComponent from '@web/components/shared/BaseComponent'

import './postList.scss'

const ROOT_ID = 'post-list'
const dummy = [
  { title: 'title1', createdAt: new Date() },
  { title: 'title2', createdAt: new Date() },
  { title: 'title3', createdAt: new Date() },
]

export default class PostList extends BaseComponent {
  constructor(props: ComponentProps) {
    super(props)
    this.render(this.getJSXstr(), ROOT_ID)
  }

  getJSXstr() {
    return `
      <div id=${ROOT_ID}>
        ${dummy.map((post) => {
          return `
            <div>
              <p>${post.title}</p>
            </div>
          `
        })}
      </div>
    `
  }
}
