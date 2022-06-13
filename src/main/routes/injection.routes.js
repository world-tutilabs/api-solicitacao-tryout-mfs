const { Router } = require("express");
const ProcessInjectionController = require("../controllers/process/ProcessInjectionController");
const injectionRoutes = Router();

injectionRoutes.put("/create/:id", ProcessInjectionController.create);
injectionRoutes.put("/edit/:id", ProcessInjectionController.edit);
injectionRoutes.put("/editPCP/:id", ProcessInjectionController.updateFromPCP);

// todas as rotas estão como put por conta de uma demanda, "salvamento automático".

module.exports = injectionRoutes;