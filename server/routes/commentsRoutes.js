const express = require('express');

const router = express.Router();
const {verify} = require("../middlewares/authMiddleware")
const commentsController = require("../controller/commentsController");

router.get("/api/getCommentsByPostId/:postId", verify, commentsController.getCommentById);
router.post("/api/createComment", verify, commentsController.createComment);
router.delete("/api/deleteComment/:id", verify, commentsController.deleteComment);


module.exports = router;