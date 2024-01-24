const express = require("express");
const historialMedico = require("../Controllers/HistorialMedico");
const tokenVerify = require("../Middlewares/TokenVerify");

const router = express.Router();

router.post("/registrar", tokenVerify, historialMedico.CrearHistorial);
router.get("/historial", tokenVerify, historialMedico.ObtenerHistorial);
router.get("/historial/:IDUsuario", tokenVerify, historialMedico.ObtenerHistorialID);

module.exports = router;
