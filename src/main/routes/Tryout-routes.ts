import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListTryoutController } from "../factories/solicitation-tryout-factory/list-tryout-factory";
import { makeListByStatusTryoutController } from "../factories/solicitation-tryout-factory/listByStatus-tryout-factory";
import { makeSignUpTryoutController } from "../factories/solicitation-tryout-factory/signup-tryout-factory";
import { makeUpdateTryoutController } from "../factories/solicitation-tryout-factory/update-tryout-factory";
import { verifyEngLogger, verifyLogger, verifyPCPlogger } from "../middlewares";
import { makeFindByIdTryoutController } from "../factories/solicitation-tryout-factory/find-by-id-tryout-factory";

export default (router: Router): void => {
  router.get("/list", verifyLogger, adaptRoute(makeListTryoutController()));
  router.get(
    "/listByStatus",
    verifyLogger,
    adaptRoute(makeListByStatusTryoutController())
  );
  router.post(
    "/signup",
    verifyLogger,
    verifyEngLogger,
    adaptRoute(makeSignUpTryoutController())
  );
  router.put(
    "/update/:id",
    verifyLogger,
    adaptRoute(makeUpdateTryoutController())
  );
  router.get("/:id", verifyLogger, adaptRoute(makeFindByIdTryoutController()));
};
