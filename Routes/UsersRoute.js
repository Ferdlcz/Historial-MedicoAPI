const express = require("express");
const UserController = require("../Controllers/Users");

const router = express.Router();

router.post("/userregister", UserController.registrarUsuario);
router.post("/login", UserController.login);
router.post("/reset-password", UserController.reqResetPassword);
router.post('/reset-password/:token', UserController.resetPassword);

module.exports = router;
