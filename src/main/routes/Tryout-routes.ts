import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeListTryoutController } from "../factories/solicitation-tryout-factory/list-tryout-factory"
import { makeSignUpTryoutController } from "../factories/solicitation-tryout-factory/signup-tryout-factory"


export default (router: Router): void => {
  router.get('/list', adaptRoute(makeListTryoutController()))
  router.post('/signup', adaptRoute(makeSignUpTryoutController()))
  
}




