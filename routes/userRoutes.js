import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer-config.js";

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.editUser);
router.post('/users/:id/toggle-block', userController.toggleBlockUser);
router.delete('/users/:id', userController.removeUser);
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, upload.single('avatar'), userController.editProfile);
router.delete('/me', auth, userController.removeProfile);

export default router;
