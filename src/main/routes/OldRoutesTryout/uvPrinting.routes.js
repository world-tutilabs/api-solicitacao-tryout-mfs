const { Router } = require("express");
const ProcessUVPrintingController = require("../controllers/process/ProcessUVPrintingController");
const uvPrintingRoutes = Router();

uvPrintingRoutes.put("/tryout/:id", ProcessUVPrintingController.create);
uvPrintingRoutes.put("/pcp/:id", ProcessUVPrintingController.updateFromPCP);
uvPrintingRoutes.put("/eng/:id",ProcessUVPrintingController.updateFromENG);

module.exports = uvPrintingRoutes;