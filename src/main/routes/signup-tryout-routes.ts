import {Router} from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpTryoutController } from '../factories/signup-tryout/signup-tryout'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpTryoutController()))
  
}




