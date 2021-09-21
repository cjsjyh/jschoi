require('dotenv').config()

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import apiRouter from './api'

const app = new Koa()
const port: number = 3000

app.use(bodyParser())

const router = new Router()
router.use('/api', apiRouter.routes())
app.use(router.routes())

app.listen(port, () => {
  console.log(`Koa server is listening on port ${port}`)
})
