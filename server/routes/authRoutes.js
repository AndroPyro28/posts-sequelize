const express = require("express");
const {verify} = require("../middlewares/authMiddleware")
const router = express.Router();
const authController = require("../controller/auth")
router.get("/api/", verify,authController.auth);

module.exports = router;