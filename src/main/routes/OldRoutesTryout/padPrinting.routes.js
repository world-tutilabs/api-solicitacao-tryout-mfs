const { Router } = require("express");
const ProcessPadPrintingController = require("../controllers/process/ProcessPadPrintingController");
const padPrintingRoutes = Router();

padPrintingRoutes.put("/tryout/:id", ProcessPadPrintingController.create);
padPrintingRoutes.put("/pcp/:id", ProcessPadPrintingController.updateFromPCP); // Mudanças de comentarios de pcp referente ao tryout
padPrintingRoutes.put("/eng/:id", ProcessPadPrintingController.updateFromENG); //Mudança de dados compostos no processo

module.exports = padPrintingRoutes;