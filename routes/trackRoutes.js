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
    ownershipMiddleware({ type: 'track', param: 'id' }),
    upload.single('photo'),
    validateTrackMiddleware,
    trackController.editTrack
);

router.delete('/:id',
    auth,
    activeUserMiddleware,
    ownershipMiddleware({ type: 'track', param: 'id' }),
    trackController.removeTrack
);

export default router;
