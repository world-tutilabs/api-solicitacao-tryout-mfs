import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeFindByScheduledTryoutRequestController } from "../factories/report-tryout-factory/find-by-scheduled-tryout-factory";
import { makeEndingTryoutRequestController } from "../factories/report-tryout-factory/homologate-tryout-factory";
import { makeListScheduledTryoutRequestController } from "../factories/report-tryout-factory/list-scheduled-tryout-factory";
import { verifyEngLogger, verifyLogger, verifyPCPlogger } from "../middlewares";

export default (router: Router): void => {
  router.patch(
    "/endingTryout/:id",
    verifyLogger,
    verifyEngLogger,
    adaptRoute(makeEndingTryoutRequestController())
  );
  router.get(
    "/listApprovedTryouts",
    verifyLogger,
    verifyEngLogger,
    adaptRoute(makeListScheduledTryoutRequestController())
  );
  router.get(
    "/findApprovedTryout/:id",
    verifyLogger,
    adaptRoute(makeFindByScheduledTryoutRequestController())
  );
};
