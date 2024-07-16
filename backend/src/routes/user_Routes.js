import { Router } from 'express'
import { loginUser, logoutUser, registerUser, bookmark, getMyProfile, getOtherUsers, follow, unfollow } from '../controllers/user_Controllers.js';

import isAuthenticated from '../middlewares/auth_middleware.js'; //middleware check by req.cookies.token

const router = Router();

router.post('/register', registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.put("/bookmark/:id", isAuthenticated, bookmark)
router.get("/profile/:id", isAuthenticated, getMyProfile);
router.get("/otheruser/:id", isAuthenticated, getOtherUsers);
router.post("/follow/:id", isAuthenticated, follow);  
router.post("/unfollow/:id", isAuthenticated, unfollow);

export default router;