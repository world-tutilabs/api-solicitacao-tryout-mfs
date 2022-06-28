import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeListTryoutController } from "../factories/solicitation-tryout-factory/list-tryout-factory"
import { makeSignUpTryoutController } from "../factories/solicitation-tryout-factory/signup-tryout-factory"
import { verifyLogger } from "../middlewares"


export default (router: Router): void => {
  router.get('/list',verifyLogger,adaptRoute(makeListTryoutController()))
  router.post('/signup', verifyLogger,adaptRoute(makeSignUpTryoutController()))
  
}




