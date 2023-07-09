import express from "express";
import { getAllPosts, getUserPosts, addRemoveLike } from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/", verifyToken, getAllPosts);
router.get("/:userId", verifyToken, getUserPosts);

/** PATCH */
// toggle between like and unlike the post
router.patch("/:postId/like", verifyToken, addRemoveLike);

export default router;