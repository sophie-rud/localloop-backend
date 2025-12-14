import express from 'express';
const router = express.Router({ mergeParams: true });
import stepController from '../controllers/stepController.js';

router.get('/', stepController.getAllStepsByTrack);
router.get('/:id', stepController.getStepByIdAndTrack);
router.post('/', stepController.createStep);
router.put('/:id', stepController.editStep);
router.delete('/:id', stepController.removeStep);

export default router;
