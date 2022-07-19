import { Express } from 'express'
import { bodyParser, contentType, cors, verifyLogger  } from '../middlewares'

export default (app: Express): void => {
  // app.use(errors)
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  // app.use(verifyLogger)
}
