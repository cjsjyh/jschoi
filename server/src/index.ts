import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const port: number = 3000
const router = new Router()

app.use(bodyParser())

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!'
})
app.use(router.routes())

app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`)
})
