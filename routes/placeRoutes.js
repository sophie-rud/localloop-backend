import express from 'express';
const router = express.Router();
import placeController from '../controllers/placeController.js';
import upload from "../middlewares/multer-config.js";

router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlaceById);
router.post('/', upload.single('photo'), placeController.createPlace);
router.put('/:id', upload.single('photo'), placeController.editPlace);
router.delete('/:id', placeController.removePlace);

export default router;
