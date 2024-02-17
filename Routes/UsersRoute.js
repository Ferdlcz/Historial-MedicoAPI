const express = require("express");
const UserController = require("../Controllers/Users");
const tokenVerify = require("../Middlewares/TokenVerify");

const router = express.Router();

router.get("/users", tokenVerify, UserController.getAllUsers)
router.get("/users/:userId", tokenVerify, UserController.getUserById);
router.post("/userregister", UserController.registrarUsuario);
router.post("/login", UserController.login);
router.post("/reset-password", UserController.reqResetPassword);
router.post('/reset-password/:token', UserController.resetPassword);

module.exports = router;
