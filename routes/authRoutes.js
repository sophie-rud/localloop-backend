import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import auth from "../middlewares/auth.js";
import refresh from "../middlewares/refresh.js";

router.post('/signup', authController.signUp);
router.post('/login', authController.signIn);
router.post("/logout", refresh, authController.logout);
router.get('/profile', auth, authController.getProfile);
router.post('/refresh', refresh, authController.getRefreshToken);

export default router;
