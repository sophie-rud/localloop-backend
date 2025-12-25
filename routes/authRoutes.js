import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import auth from "../middlewares/auth.js";
import refreshTokenMiddleware from "../middlewares/refresh-token-middleware.js";

router.post('/signup', authController.signUp);
router.post('/login', authController.signIn);
router.post('/logout', refreshTokenMiddleware, authController.logout);
router.get('/me', auth, authController.getProfile);
router.post('/refresh', refreshTokenMiddleware, authController.getRefreshToken);

export default router;
