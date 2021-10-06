import { routes as BlogRoutes } from './Blog/routes'
import { route as NotFoundRoute } from './NotFound/route'
import { RouteType } from '../types'

export const routes: RouteType[] = [...BlogRoutes, NotFoundRoute]
