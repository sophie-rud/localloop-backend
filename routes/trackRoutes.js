import express from 'express';
const router = express.Router();
import trackController from '../controllers/trackController.js';

router.get('/', trackController.getAllTracks);
router.get('/:id', trackController.getTrackById);
router.post('/', trackController.createTrack);
router.put('/:id', trackController.editTrack);
router.delete('/:id', trackController.removeTrack);

export default router;
