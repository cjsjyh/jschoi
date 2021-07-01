import { ComponentProps } from '@web/types'
import { JSXstrToHTML } from '@web/util/JSXParser'

export default class BaseComponent {
  $parent: HTMLElement
  $element: HTMLElement
  JSXstr: string
  isReturnStr: boolean

  constructor({ $parent, isReturnStr = false }: ComponentProps) {
    this.$parent = $parent
    this.isReturnStr = isReturnStr
  }

  render(JSXstr: string, elementId: string) {
    if (this.isReturnStr) {
      this.JSXstr = JSXstr
    } else {
      this.$element = JSXstrToHTML(this.$parent, JSXstr, elementId)
    }
  }
}
