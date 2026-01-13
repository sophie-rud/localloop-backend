import trackService from '../services/TrackService.js';

function ownershipMiddleware({ param }) {
    return async (req, res, next) => {
        try {
            // Skip ownership validation if user has ADMIN role
            if (req.auth.roleId === 2) {
                return next();
            }

            // Track ownership validation
            const track = await trackService.getTrackById(req.params[param]);

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
