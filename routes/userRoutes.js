import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import auth from "../middlewares/auth.js";

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.editUser);
router.delete('/users/:id', userController.removeUser);
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.editProfile);
router.delete('/me', auth, userController.removeProfile);

export default router;
