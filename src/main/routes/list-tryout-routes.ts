import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListTryoutController } from "../factories/list-tryout/list-tryout";
// import { adaptRoute } from "../adapters/express-route-adapter";

export default (router: Router): void => {
    router.get('/list', adaptRoute(makeListTryoutController()))
    
  }
  