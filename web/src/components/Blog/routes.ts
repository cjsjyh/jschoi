import { RouteType } from '@web/types'

import { route as PostRoute } from './Post/route'

const path = '/blog'
export const routes = [PostRoute].map((route: RouteType) => ({ ...route, path: path + route.path }))
