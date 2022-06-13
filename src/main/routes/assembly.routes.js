const { Router } = require("express");
const ProcessAssemblyController = require("../controllers/process/ProcessAssemblyController");
const assemblyRoutes = Router();

assemblyRoutes.put("/tryout/:id", ProcessAssemblyController.create);
assemblyRoutes.put("/pcp/:id", ProcessAssemblyController.updateFromPCP);
assemblyRoutes.put("/eng/:id", ProcessAssemblyController.updateFromENG);

module.exports = assemblyRoutes;