import express from 'express';
const router = express.Router();
import themeController from '../controllers/themeController.js';

router.get('/', themeController.getAllThemes);
router.get('/:id', themeController.getThemeById);

export default router;
