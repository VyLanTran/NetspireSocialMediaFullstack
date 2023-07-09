import express from "express";
import {
    getUser,
    getUserFollowings,
    getUserFollowers,
    addRemoveFollowing
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/:userId", verifyToken, getUser);
router.get("/:userId/followings", verifyToken, getUserFollowings);
router.get("/:userId/followers", verifyToken, getUserFollowers);

/** UPDATE */
router.patch("/:userId/:followingId", verifyToken, addRemoveFollowing);

export default router;