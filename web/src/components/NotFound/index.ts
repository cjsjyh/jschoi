import { ComponentProps } from '@web/types'

import BaseComponent from '@web/components/shared/BaseComponent'

const ROOT_ID = 'page-notfound'

export default class Post extends BaseComponent {
  constructor(props: ComponentProps) {
    super(props)

    this.render(this.getJSXstr(), ROOT_ID)
  }

  getJSXstr() {
    return `
      <div id=${ROOT_ID}>
        Page Not Found
      </div>
    `
  }
}
