import Post from './index'
import { RouteType } from '../../types'

export const route: RouteType = {
  path: '/post/{postId}',
  component: Post,
}
