import express from 'express';
const router = express.Router();
import favoriteController from '../controllers/favoriteController.js';
import auth from "../middlewares/auth.js";

router.get('/ids', auth, favoriteController.getUserFavoritesIds);
router.get('/', auth, favoriteController.getUserFavoritesWithDetails);
router.post('/:trackId', auth, favoriteController.addFavorite);
router.delete('/:trackId', auth, favoriteController.removeFavorite);

export default router;
