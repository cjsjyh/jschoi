import Router from 'koa-router'
import { getManager } from 'typeorm'
import { Post } from '@entity/blog/post.entity'

const router = new Router()

router.get('/', async function (ctx) {
  console.log(await getManager().getRepository(Post).find())
  ctx.body = 'list'
})

export default router
