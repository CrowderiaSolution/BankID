import bodyParser from 'body-parser'
import morgan from 'morgan'

const BODYPARSER = {
  JSON: {
    limit: '50mb'
  },
  URLENCODED: {
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  }
}

export default app => {
  app.use(bodyParser.json(BODYPARSER.JSON))
  app.use(bodyParser.urlencoded(BODYPARSER.URLENCODED))
  app.use(morgan('dev'))
}
