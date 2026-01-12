import express from 'express';
import resetPasswordController from "../controllers/resetPasswordController.js";
import validatePasswordMiddleware from "../middlewares/validate-password-middleware.js";

const router = express.Router();

router.post('/forgot-password', resetPasswordController.forgotPassword);
router.get('/reset-password/:token', resetPasswordController.verifyResetToken);
router.post('/reset-password/:token', validatePasswordMiddleware, resetPasswordController.resetPassword);

export default router;
