import { FoundComponentType } from '@web/types'

const isParam = (str) => str[0] == '{' && str[str.length - 1] == '}'
const extractParam = (str) => str.slice(1, str.length)

const compareAndExtractParamFromPath = (pattern, path, result) => {
  const componentPath = pattern.split('/')
  const browserPath = path.split('/')
  if (componentPath.length !== browserPath.length) {
    return false
  }

  result.params = {}
  const isMatch = componentPath.every((path, index) => {
    if (path !== browserPath[index]) {
      if (!isParam(path)) {
        return false
      }
      result.params[extractParam(path)] = browserPath[index]
    }
    return true
  })
  return isMatch
}

export const matchPath = (routes, path): FoundComponentType => {
  let result
  const isRouteMatched = routes.some((route) => {
    result = { ...route }
    return compareAndExtractParamFromPath(route.path, path, result)
  })
  if (isRouteMatched) {
    return result
  }
  return routes.find((route) => route.path === '/')
}
