import express from 'express';
import authController from '../controllers/authController.js';
import refreshTokenMiddleware from "../middlewares/refresh-token-middleware.js";
import loginMiddleware from "../middlewares/login-middleware.js";
import validateEmailUsernameMiddleware from "../middlewares/validate-email-username-middleware.js";
import validatePasswordMiddleware from "../middlewares/validate-password-middleware.js";

const router = express.Router();

router.post('/signup', validateEmailUsernameMiddleware, validatePasswordMiddleware, authController.signUp);
router.post('/login', loginMiddleware, authController.signIn);
router.post('/logout', refreshTokenMiddleware, authController.logout);
router.post('/refresh', refreshTokenMiddleware, authController.getRefreshToken);

export default router;
