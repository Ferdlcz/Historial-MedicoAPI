const express = require("express");
const historialMedico = require("../Controllers/HistorialMedico");
const tokenVerify = require("../Middlewares/TokenVerify");
const search = require('../Controllers/Search')

const router = express.Router();

router.post("/registrar", tokenVerify, historialMedico.CrearHistorial);
router.post("/observacion", historialMedico.Observations);
router.put('/actualizarHistorial/:IDUsuario', tokenVerify, historialMedico.ActualizarHistorial);
router.get("/historial", tokenVerify, historialMedico.ObtenerHistorial);
router.get("/historial/:IDUsuario", tokenVerify, historialMedico.ObtenerHistorialID);
router.get("/user/historial/:IDUsuario", tokenVerify,  historialMedico.ObtenerHistorialByID);

module.exports = router;
