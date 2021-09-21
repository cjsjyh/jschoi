import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import apiRouter from './api'

const app = new Koa()
const port: number = 3000
const router = new Router()

app.use(bodyParser())

router.use('/api', apiRouter.routes())
app.use(router.routes())

app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`)
})
