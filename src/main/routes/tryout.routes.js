const { Router } = require("express");
const TryoutController = require("../controllers/TryoutController")
const tryoutRoutes = Router();

tryoutRoutes.post("/", TryoutController.create);
tryoutRoutes.get("/index", TryoutController.index);
tryoutRoutes.get("/", TryoutController.showAll);
tryoutRoutes.get("/allData/", TryoutController.showDataTryout); // The route get all data of params(Tryout and Process)
tryoutRoutes.get("/:id", TryoutController.showId);
tryoutRoutes.get("/data/:id", TryoutController.findByDataTryout);
tryoutRoutes.put("/:id", TryoutController.update);
tryoutRoutes.put("/changeStatus/:id", TryoutController.ChangeStatusTryout);
tryoutRoutes.put("/reprogramTryOut/:id", TryoutController.ReprogramTryOut);
tryoutRoutes.delete("/:id", TryoutController.remove);

module.exports = tryoutRoutes
