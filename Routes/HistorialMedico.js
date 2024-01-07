const express = require('express');
const HistorialMedico = require ('../Controllers/HistorialMedico');

const router = express.Router();

router.post('/registrar', HistorialMedico.CrearHistorial);
router.get('/historial', HistorialMedico.ObtenerHistorial);

module.exports = router;
