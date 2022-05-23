const express = require('express');

const router = express.Router();

const postsController = require("../controller/postsController");
const { verify } = require("../middlewares/authMiddleware");

router.get("/api/getAllPosts", postsController.getPosts);

router.post("/api/createPost", verify, postsController.createPost);

router.get("/api/getPostById/:id", verify, postsController.getPostById);

router.delete("/api/deletePost/:id", verify, postsController.deletePost);

router.put("/api/editPost", verify, postsController.editPost);


module.exports = router;