import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.removeUser);

export default router;
