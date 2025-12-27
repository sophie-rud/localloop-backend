import express from 'express';
import authController from '../controllers/authController.js';
import refreshTokenMiddleware from "../middlewares/refresh-token-middleware.js";

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.signIn);
router.post('/logout', refreshTokenMiddleware, authController.logout);
router.post('/refresh', refreshTokenMiddleware, authController.getRefreshToken);

export default router;
