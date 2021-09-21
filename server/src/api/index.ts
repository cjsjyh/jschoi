import Router from 'koa-router'

import blogRouter from './blog'

const router = new Router()

router.get('/', async function (ctx) {
  ctx.body = 'hello world'
})

router.use('/blog', blogRouter.routes())

export default router
