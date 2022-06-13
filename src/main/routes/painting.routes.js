const { Router } = require("express");
const ProcessPaintingController = require("../controllers/process/ProcessPaintingController");
const paintingRoutes = Router();

paintingRoutes.put("/tryout/:id", ProcessPaintingController.create);
paintingRoutes.put("/pcp/:id", ProcessPaintingController.updateFromPCP);
paintingRoutes.put("/eng/:id", ProcessPaintingController.updateFromENG);

module.exports = paintingRoutes;