const { Router } = require("express");
const ProcessScreenController = require("../controllers/process/ProcessScreenController");
const screenRoutes = Router();

screenRoutes.put("/tryout/:id", ProcessScreenController.create);
screenRoutes.put("/pcp/:id", ProcessScreenController.updateFromPCP);
screenRoutes.put("/eng/:id",ProcessScreenController.updateFromENG);

module.exports = screenRoutes;