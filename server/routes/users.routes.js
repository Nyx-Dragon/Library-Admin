const express = require("express");
const membersController = require("../controllers/members.controller");
const router = express.Router();

router.post("/login", membersController.login);

module.exports = router;
