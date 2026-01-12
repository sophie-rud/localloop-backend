import express from 'express';
const router = express.Router();
import placeController from '../controllers/placeController.js';
import upload from "../middlewares/multer-config.js";
import adminRoleMiddleware from "../middlewares/admin-role-middleware.js";
import validatePlaceMiddleware from "../middlewares/validate-place-middleware.js";

router.get('/',
    placeController.getAllPlaces
);

router.get('/:id',
    placeController.getPlaceById
);

router.post('/',
    adminRoleMiddleware,
    validatePlaceMiddleware,
    upload.single('photo'),
    placeController.createPlace
);

router.put('/:id',
    adminRoleMiddleware,
    validatePlaceMiddleware,
    upload.single('photo'),
    placeController.editPlace
);

router.delete('/:id',
    adminRoleMiddleware,
    placeController.removePlace
);

export default router;
