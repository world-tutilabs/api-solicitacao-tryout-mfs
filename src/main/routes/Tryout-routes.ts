import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeListTryoutController } from "../factories/solicitation-tryout-factory/list-tryout-factory"
import { makeSignUpTryoutController } from "../factories/solicitation-tryout-factory/signup-tryout-factory"
import { makeUpdateTryoutController } from "../factories/solicitation-tryout-factory/update-tryout-factory"
import { verifyEngLogger, verifyLogger, verifyPCPlogger } from "../middlewares"


export default (router: Router): void => {
  router.get('/list',verifyLogger,adaptRoute(makeListTryoutController()))
  router.post('/signup',verifyLogger,verifyEngLogger,adaptRoute(makeSignUpTryoutController()))
  router.put('/update/:id',verifyLogger, verifyPCPlogger, adaptRoute(makeUpdateTryoutController()))
}




