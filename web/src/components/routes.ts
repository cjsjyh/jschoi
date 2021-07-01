import { route as PostRoute } from './Post/route'
import { route as NotFoundRoute } from './NotFound/route'
import { RouteType } from '../types'

export const routes: RouteType[] = [PostRoute, NotFoundRoute]
