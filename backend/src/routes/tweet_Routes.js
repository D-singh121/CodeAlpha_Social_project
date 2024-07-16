import { Router } from "express";
import isAuthenticated from '../middlewares/auth_middleware.js';

import { createTweet, deleteTweet, likeOrDislike , getAllTweets ,getFollowingTweets } from "../controllers/tweet_Controllers.js";

const router = Router();

router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id",isAuthenticated, likeOrDislike);
router.get("/alltweets/:id", getAllTweets);
router.get("/followingtweets/:id", getFollowingTweets);

export default router;