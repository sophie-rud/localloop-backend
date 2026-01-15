import express from 'express';
import authController from '../controllers/authController.js';
import refreshTokenMiddleware from "../middlewares/refresh-token-middleware.js";
import loginMiddleware from "../middlewares/login-middleware.js";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // strict
    message: "Trop de tentatives, réessayez dans 15 minutes."
});

// router.post('/signup', validateEmailUsernameMiddleware, validatePasswordMiddleware, authController.signUp);
router.post(
    "/signup",
    [
        body("email").isEmail().normalizeEmail(),
        body("username").trim().escape(),
        body("password").isLength({ min: 8 }),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        authController.signUp(req, res);
    }
);
router.post('/login', authLimiter, loginMiddleware, authController.signIn);
router.post('/logout', refreshTokenMiddleware, authController.logout);
router.post('/refresh', refreshTokenMiddleware, authController.getRefreshToken);

export default router;
