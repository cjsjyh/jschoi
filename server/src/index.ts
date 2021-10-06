require('dotenv').config()

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

import apiRouter from './api'

createConnection()
  .then(() => {
    const app = new Koa()
    const port = 8000

    app.use(bodyParser())

    const router = new Router()
    router.use('/api', apiRouter.routes())

    app.use(router.routes())

    app.listen(port, () => {
      console.log(`Koa server is listening on port ${port}`)
    })
  })
  .catch((err) => console.log(err))
