const express = require("express");

const router = express.Router();

const likeController = require("../controller/likesController");
const {verify} = require("../middlewares/authMiddleware");


router.post("/api/likes", verify, likeController.likeorDislikePost);

module.exports = router;
