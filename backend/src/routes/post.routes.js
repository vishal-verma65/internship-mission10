import express from "express";
import { createPost, getAllPosts, getPostById, deletePost, getTopRecentPosts} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/top/recent", getTopRecentPosts);

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

export default router;