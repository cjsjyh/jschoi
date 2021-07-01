import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import '@web/assets/scss/global.scss'

import { renderComponentByPath } from '@web/util/router'

dayjs.locale('ko')

console.log('index')
renderComponentByPath(location.pathname)
