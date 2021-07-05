import { FoundComponentType, RouteType } from '@web/types'

interface PathMatch {
  isMatch: boolean
  params?: { [key: string]: string }
}

const NOT_FOUND_PATH = '/'
const isParam = (str: string): boolean => str[0] == '{' && str[str.length - 1] == '}'
const extractParam = (str: string): string => str.slice(1, str.length - 1)
const splitAndCleanUp = (str: string): string[] =>
  str
    .trim()
    .split('/')
    .filter((s) => s)

export const isPathSameWithParam = (componentPathArr: string[], browserPathArr: string[]): PathMatch => {
  const params = {}
  const isMatch = componentPathArr.every((path, index) => {
    if (path !== browserPathArr[index]) {
      if (!isParam(path)) {
        return false
      }
      params[extractParam(path)] = browserPathArr[index]
    }
    return true
  })
  return { isMatch, params }
}

const isPathExactlySame = (componentPathArr: string[], browserPathArr: string[]): PathMatch => {
  const isMatch = componentPathArr.every((path, index) => {
    if (path !== browserPathArr[index]) {
      return false
    }
    return true
  })
  return { isMatch }
}

export const matchPath = (routes: RouteType[], browserPath: string): FoundComponentType => {
  let result
  const isRouteMatched = routes.some((route) => {
    const componentPathArr = splitAndCleanUp(route.path)
    const browserPathArr = splitAndCleanUp(browserPath)
    if (componentPathArr.length !== browserPathArr.length) {
      return false
    }

    const { isMatch } = isPathExactlySame(componentPathArr, browserPathArr)
    if (isMatch) {
      result = route
      return true
    } else {
      const { isMatch, params } = isPathSameWithParam(componentPathArr, browserPathArr)
      if (isMatch) {
        result = { ...route, params, isMatch }
        return true
      }
    }
    return false
  })
  if (isRouteMatched) {
    return { isMatch: true, ...result }
  }
  const notFoundRoute = routes.find((route) => route.path === NOT_FOUND_PATH)
  return { isMatch: false, ...notFoundRoute }
}
