const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/postController");

const router = express.Router();

router.post("/", authenticate, createPost);

router.get("/", getPosts);

router.get("/:id", getPostById);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;