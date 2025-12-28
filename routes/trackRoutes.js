import express from 'express';
const router = express.Router();
import trackController from '../controllers/trackController.js';
import upload from "../middlewares/multer-config.js";
import auth from "../middlewares/auth.js";

router.get('/', trackController.getAllTracks);
router.get('/:id', trackController.getTrackById);
router.post('/', auth, upload.single('photo'), trackController.createTrack);
router.put('/:id', auth, upload.single('photo'), trackController.editTrack);
router.delete('/:id', auth, trackController.removeTrack);

export default router;
