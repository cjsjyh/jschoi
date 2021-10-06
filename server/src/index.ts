require('dotenv').config()

import Koa, { DefaultState } from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

import apiRouter from './api'

createConnection()
  .then(async (connection) => {
    const app = new Koa()
    const port = 3000

    app.use(bodyParser())

    const router = new Router()
    router.use('/api', apiRouter.routes())

    app.use(router.routes())

    app.listen(port, () => {
      console.log(`Koa server is listening on port ${port}`)
    })
  })
  .catch((err) => console.log(err))
