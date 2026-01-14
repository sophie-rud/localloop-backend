import express from 'express';
const router = express.Router();
import trackController from '../controllers/trackController.js';
import upload from "../middlewares/multer-config.js";
import auth from "../middlewares/auth.js";
import validateTrackMiddleware from "../middlewares/validate-track-middleware.js";
import ownershipMiddleware from "../middlewares/ownership-middleware.js";
import activeUserMiddleware from "../middlewares/active-user-middleware.js";

router.get('/',
    trackController.getAllTracks
);

router.get('/:id',
    trackController.getTrackById
);

router.post('/',
    auth,
    activeUserMiddleware,
    upload.single('photo'),
    validateTrackMiddleware,
    trackController.createTrack
);

router.put('/:id',
    auth,
    activeUserMiddleware,
    ownershipMiddleware({ param: 'id' }),
    upload.single('photo'),
    validateTrackMiddleware,
    trackController.editTrack
);

router.delete('/:id',
    auth,
    activeUserMiddleware,
    ownershipMiddleware({ param: 'id' }),
    trackController.removeTrack
);

router.patch('/:id/publish',
    auth,
    ownershipMiddleware({ param: 'id' }),
    trackController.publishTrack
);

router.patch('/:id/unpublish',
    auth,
    ownershipMiddleware({ param: 'id' }),
    trackController.unpublishTrack
);

export default router;
