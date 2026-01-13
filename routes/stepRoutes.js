import express from 'express';
const router = express.Router({ mergeParams: true });
import stepController from '../controllers/stepController.js';
import upload from "../middlewares/multer-config.js";
import validateStepMiddleware from "../middlewares/validate-step-middleware.js";
import auth from "../middlewares/auth.js";
import activeUserMiddleware from "../middlewares/active-user-middleware.js";
import ownershipMiddleware from "../middlewares/ownership-middleware.js";

router.get('/',
    stepController.getAllStepsByTrack
);

router.get('/:id',
    stepController.getStepByIdAndTrack
);

router.post('/',
    auth,
    activeUserMiddleware,
    upload.single('photo'),
    validateStepMiddleware,
    stepController.createStep
);

router.put('/:id',
    auth,
    activeUserMiddleware,
    ownershipMiddleware({ param: 'trackId' }),
    upload.single('photo'),
    validateStepMiddleware,
    stepController.editStep
);

router.delete('/:id',
    auth,
    activeUserMiddleware,
    ownershipMiddleware({ param: 'trackId' }),
    stepController.removeStep
);

router.patch('/:id/reorder',
    auth,
    activeUserMiddleware,
    ownershipMiddleware({ param: 'trackId' }),
    stepController.reorderSteps
);

export default router;
