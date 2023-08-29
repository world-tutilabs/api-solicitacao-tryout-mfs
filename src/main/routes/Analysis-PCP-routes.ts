import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeHomologateTryoutController } from "../factories/analysis-pcp-tryout-factory/homologate-tryout-factory";
import { verifyLogger, verifyPCPlogger } from "../middlewares";

export default (router: Router): void => {
  router.patch(
    "/homologate/:id",
    verifyLogger,
    verifyPCPlogger,
    adaptRoute(makeHomologateTryoutController())
  );
};
