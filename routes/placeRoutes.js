import express from 'express';
const router = express.Router();
import placeController from '../controllers/placeController.js';
import upload from "../middlewares/multer-config.js";
import adminRoleMiddleware from "../middlewares/admin-role-middleware.js";
import validatePlaceMiddleware from "../middlewares/validate-place-middleware.js";
import auth from "../middlewares/auth.js";

router.get('/',
    placeController.getAllPlaces
);

router.get('/:id',
    placeController.getPlaceById
);

router.post('/',
    auth,
    adminRoleMiddleware,
    upload.single('photo'),
    validatePlaceMiddleware,
    placeController.createPlace
);

router.put('/:id',
    auth,
    adminRoleMiddleware,
    upload.single('photo'),
    validatePlaceMiddleware,
    placeController.editPlace
);

router.delete('/:id',
    auth,
    adminRoleMiddleware,
    placeController.removePlace
);

export default router;
