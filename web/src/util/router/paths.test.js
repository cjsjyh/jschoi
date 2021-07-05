import { matchPath } from './paths'

const pathCases = [
  // root
  { componentPath: '/', browserPath: '/', result: { isMatch: true } },
  // single path
  { componentPath: '/post', browserPath: '/post', result: { isMatch: true } },
  { componentPath: '/post', browserPath: '/post/', result: { isMatch: true } },
  { componentPath: '/post', browserPath: '/', result: { isMatch: false } },
  { componentPath: '/post', browserPath: '/post/test', result: { isMatch: false } },
  { componentPath: '/{id}', browserPath: '/1', result: { isMatch: true, params: { id: '1' } } },
  // nested path
  { componentPath: '/post/test', browserPath: '/post/test', result: { isMatch: true } },
  { componentPath: '/post/test', browserPath: '/post/test/', result: { isMatch: true } },
  { componentPath: '/post/test/', browserPath: '/post/test', result: { isMatch: true } },
  { componentPath: '/post/{id}', browserPath: '/post/5', result: { isMatch: true, params: { id: '5' } } },
  { componentPath: '/post/{id}/', browserPath: '/post/5', result: { isMatch: true, params: { id: '5' } } },
  { componentPath: '/post/{id}', browserPath: '/post/5/', result: { isMatch: true, params: { id: '5' } } },
  { componentPath: '/post/{id}', browserPath: '/post/5/test', result: { isMatch: false } },
  // something long
  { componentPath: '/post/test1/test2/test3', browserPath: '/post/test1/test2/test3', result: { isMatch: true } },
  { componentPath: '/post/test1/test2/test3', browserPath: '/post/test1/test2/test3/', result: { isMatch: true } },
  { componentPath: '/post/{postId}/user/{userId}', browserPath: '/post/5/user/2', result: { isMatch: true, params: { postId: '5', userId: '2' } } },
  { componentPath: '/post/{postId}/user/{userId}', browserPath: '/post/5/users/2', result: { isMatch: false } },
  {
    componentPath: '/post/{postId}/user/{userId}',
    browserPath: '/post/5/user/2/test2',
    result: { isMatch: false },
  },
]

describe('Path match test', () => {
  test.each(pathCases)('matchPath', ({ componentPath, browserPath, result }) => {
    const matchResult = matchPath([{ path: componentPath }], browserPath)
    if (!matchResult.isMatch) {
      expect(matchResult.isMatch).toEqual(result.isMatch)
    } else {
      const extractedResult = { isMatch: matchResult.isMatch, params: matchResult.params }
      expect(extractedResult).toEqual(result)
    }
  })
})
