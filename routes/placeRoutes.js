import express from 'express';
const router = express.Router();
import placeController from '../controllers/placeController.js';

router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlaceById);
router.post('/', placeController.createPlace);
router.put('/:id', placeController.editPlace);
router.delete('/:id', placeController.removePlace);

export default router;
