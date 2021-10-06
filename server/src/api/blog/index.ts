import Router from 'koa-router'

import postRouter from './post'

const router = new Router()

router.use(postRouter.routes())

export default router
