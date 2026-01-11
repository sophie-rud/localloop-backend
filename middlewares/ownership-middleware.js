import trackService from '../services/TrackService.js';
import stepService from '../services/StepService.js';

function ownershipMiddleware({ type, param }) {
    return async (req, res, next) => {
        try {
            let track;

            if (type === 'track') {
                track = await trackService.getTrackById(req.params[param]);
            }

            if (type === 'step') {
                const step = await stepService.getStepById(req.params[param]);
                if (!step) {
                    return res.status(404).json({ message: "Étape introuvable" });
                }
                track = await trackService.getTrackById(step.trackId);
            }

            if (!track) {
                return res.status(404).json({ message: "Parcours introuvable" });
            }

            if (track.userId !== req.auth.userId) {
                return res.status(403).json({ message: "Accès refusé : vous n'êtes pas propriétaire" });
            }

            req.track = track;
            next();
        } catch (err) {
            next(err);
        }
    };
}

export default ownershipMiddleware;
