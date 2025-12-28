import express from 'express';
const router = express.Router({ mergeParams: true });
import stepController from '../controllers/stepController.js';
import upload from "../middlewares/multer-config.js";

router.get('/', stepController.getAllStepsByTrack);
router.get('/:id', stepController.getStepByIdAndTrack);
router.post('/', upload.single('photo'), stepController.createStep);
router.put('/:id', upload.single('photo'), stepController.editStep);
router.delete('/:id', stepController.removeStep);

export default router;
