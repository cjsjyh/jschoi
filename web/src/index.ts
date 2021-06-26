import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import '@web/assets/scss/global.scss'

import Post from '@web/components/Post'

dayjs.locale('ko')

function component() {
  var $element = document.createElement('div')

  /* lodash is required for the next line to work */
  new Post({ $parent: $element })
  return $element
}

document.body.appendChild(component())
