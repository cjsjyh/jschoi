import { FoundComponentType } from '@web/types'
import { routes } from '@web/components/routes'

import { matchPath } from './paths'

const renderComponent = ({ component, params }: FoundComponentType) => {
  new component({ params, $parent: document.querySelector('#root') })
}

export const renderComponentByPath = (path) => {
  renderComponent(matchPath(routes, path))
}

window.addEventListener('pushState', () => {
  const path = location.pathname
  renderComponentByPath(path)
})

window.addEventListener('popState', () => {
  const path = location.pathname
  renderComponentByPath(path)
})
