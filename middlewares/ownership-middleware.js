import trackService from '../services/TrackService.js';

function ownershipMiddleware({ type, param }) {
    return async (req, res, next) => {
        try {
            // Track ownership validation
            let track;

            if (type === 'track') {
                track = await trackService.getTrackById(req.params[param]);
            }

            // Step ownership validation
            if (type === 'step') {
                track = await trackService.getTrackById(req.params.trackId);
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
