import Post from './index'
import { RouteType } from '@web/types'

export const route: RouteType = {
  path: '/post/{postId}',
  component: Post,
}
