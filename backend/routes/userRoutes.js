const express = require("express");
const { signup, login, logout, getMe, getUsers, updateUser, savePost, unsavePost } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", authenticate, getMe);
router.post("/saved-posts/:postId", authenticate, savePost);
router.delete("/saved-posts/:postId", authenticate, unsavePost);

router.get("/users", authenticate, getUsers);

router.put("/profile", authenticate, updateUser);

module.exports = router;