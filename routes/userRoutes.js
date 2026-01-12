import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer-config.js";
import adminRoleMiddleware from "../middlewares/admin-role-middleware.js";
import validateEmailUsername from "../middlewares/validate-email-username-middleware.js";

router.get('/users', adminRoleMiddleware, userController.getAllUsers);
router.get('/users/:id', adminRoleMiddleware, userController.getUserById);
router.post('/users', adminRoleMiddleware, validateEmailUsername, userController.createUser);
router.put('/users/:id', adminRoleMiddleware,validateEmailUsername, userController.editUser);
router.post('/users/:id/toggle-block', adminRoleMiddleware, userController.toggleBlockUser);
router.delete('/users/:id', adminRoleMiddleware, userController.removeUser);

// Routes /me (profile and resources related to the logged-in user)
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, upload.single('avatar'), validateEmailUsername, userController.editProfile);
router.delete('/me', auth, userController.removeProfile);

export default router;
