const express = require("express");
const tokenVerify = require("../Middlewares/TokenVerify");
const searchController = require("../Controllers/Search")

const router = express.Router();

router.get("/buscar", searchController.searchUser)

module.exports = router;
