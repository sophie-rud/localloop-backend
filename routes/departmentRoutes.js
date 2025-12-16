import express from 'express';
const router = express.Router();
import departmentController from '../controllers/departmentController.js';

router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);

export default router;
