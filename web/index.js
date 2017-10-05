/* eslint-disable no-console */
import express from 'express'
import { router } from './routes'
import { Logger } from '../config'

const app = express()
const expressRoute = express.Router()

Logger(app)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, setid, partid, catagoryid')
  next()
})

app.use('/v1', router(expressRoute))

exports.app = app
