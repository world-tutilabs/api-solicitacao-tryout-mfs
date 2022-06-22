import {Router} from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeListTryoutController } from '../factories/list-tryout/list-tryout'
import { makeSignUpTryoutController } from '../factories/signup-tryout/signup-tryout'

export default (router: Router): void => {
  router.get('/list', adaptRoute(makeListTryoutController()))
  router.post('/signup', adaptRoute(makeSignUpTryoutController()))
  
}




