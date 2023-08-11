import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListTryoutController } from "../factories/solicitation-tryout-factory/list-tryout-factory";
import { makeListByStatusTryoutController } from "../factories/solicitation-tryout-factory/listByStatus-tryout-factory";
import { makeSignUpTryoutController } from "../factories/solicitation-tryout-factory/signup-tryout-factory";
import { makeUpdateTryoutController } from "../factories/solicitation-tryout-factory/update-tryout-factory";
import { verifyEngLogger, verifyLogger, verifyPCPlogger } from "../middlewares";
import { makeFindByIdTryoutController } from "../factories/solicitation-tryout-factory/find-by-id-tryout-factory";
import { makeListByReasonTryoutController } from "../factories/solicitation-tryout-factory/list-by-reason-factory";

export default (router: Router): void => {
  // GET routes
  router.get("/:id", verifyLogger, adaptRoute(makeFindByIdTryoutController()));
  router.get(
    "/solicitation/historic",
    verifyLogger,
    adaptRoute(makeListTryoutController())
  );
  router.get(
    "/modification/historic",
    verifyLogger,
    adaptRoute(makeListByReasonTryoutController())
  );
  router.get(
    "/solicitation/listByStatus",
    verifyLogger,
    adaptRoute(makeListByStatusTryoutController())
  );

  // POST routes
  router.post(
    "/signup",
    verifyLogger,
    verifyEngLogger,
    adaptRoute(makeSignUpTryoutController())
  );

  // PUT routes
  router.put(
    "/update/:id",
    verifyLogger,
    adaptRoute(makeUpdateTryoutController())
  );
};
