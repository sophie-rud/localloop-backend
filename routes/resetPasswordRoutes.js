import express from 'express';
import resetPasswordController from "../controllers/resetPasswordController.js";

const router = express.Router();

router.post('/forgot-password', resetPasswordController.forgotPassword);
router.get('/reset-password/:token', resetPasswordController.verifyResetToken);
router.post('/reset-password/:token', resetPasswordController.resetPassword);

export default router;
