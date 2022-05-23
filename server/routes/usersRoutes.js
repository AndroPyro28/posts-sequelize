const express = require('express');

const router = express.Router();
const usersController = require('../controller/usersController');

router.post("/api/signup", usersController.signup);
router.post("/api/login", usersController.login);

module.exports = router;