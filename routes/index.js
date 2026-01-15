import express from 'express';
const router = express.Router()

import trackRoutes from './trackRoutes.js';
import stepRoutes from './stepRoutes.js';
import placeRoutes from './placeRoutes.js';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import themeRoutes from './themeRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import stepController from "../controllers/stepController.js";
import resetPasswordRoutes from "./resetPasswordRoutes.js";
import favoriteRoutes from "./favoriteRoutes.js";

router.use('/tracks', trackRoutes);
router.use('/tracks/:trackId/steps', stepRoutes);
// router.get('/steps', stepController.getAllSteps);
router.use('/places', placeRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/', userRoutes);
router.use('/', authRoutes);
router.use('/', resetPasswordRoutes);
router.use('/themes', themeRoutes);
router.use('/departments', departmentRoutes);

export default router;