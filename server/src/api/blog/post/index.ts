import Router from 'koa-router'
import { getManager } from 'typeorm'
import { Post } from '@entity/blog/post.entity'

const router = new Router()

router
  .get('/post', async (ctx) => {
    ctx.body = await getManager().getRepository(Post).find()
  })
  .get('/post/:id', async (ctx) => {
    ctx.body = await getManager().getRepository(Post).findOne(ctx.params.id)
  })
  .post('/post', async (ctx) => {
    try {
      if (ctx.request.body?.password !== process.env.MASTER_PASSWORD) {
        throw new Error()
      }
      await getManager().getRepository(Post).insert(ctx.request.body)
      ctx.body = true
    } catch {
      ctx.body = false
    }
  })
  .del('/post/:id', async (ctx) => {
    try {
      if (ctx.request.body?.password !== process.env.MASTER_PASSWORD) {
        throw new Error()
      }
      await getManager().getRepository(Post).delete(ctx.params.id)
      ctx.body = true
    } catch {
      ctx.body = false
    }
  })

export default router
