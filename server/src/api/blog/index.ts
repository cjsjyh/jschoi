import Router from 'koa-router'
const router = new Router()

router.get('/', async function (ctx) {
  ctx.body = 'list'
})

export default router
