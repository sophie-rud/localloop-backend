function validateTrackMiddleware(req, res, next) {
    const { title, distance, duration, difficulty, presentation, themeId } = req.body;

    // Title validation
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: "Vous avez oublié le titre du parcours !" });
    }

    // Distance validation
    if (distance !== undefined && distance !== null && distance !== '') {
        const distanceNum = Number(distance);
        if (isNaN(distanceNum) || distanceNum < 0) {
            return res.status(400).json({ message: "Distance invalide" });
        }
    }

    // Duration validation
    if (duration !== undefined && duration !== null && duration !== '') {
        const durationNum = Number(duration);
        if (isNaN(durationNum) || durationNum < 0) {
            return res.status(400).json({ message: "Durée invalide" });
        }
    }

    // Difficulty validation
    if (!difficulty || difficulty.trim() === '') {
        return res.status(400).json({ message: "Indiquer la difficulté" });
    }

    // Presentation validation
    if (!presentation || presentation.trim() === '') {
        return res.status(400).json({ message: "Ajouter une courte présentation de votre parcours !" });
    }

    // ThemeId validation
    const themeIdNum = parseInt(themeId);
    if (!themeId || isNaN(themeIdNum) || themeIdNum < 1) {
        return res.status(400).json({ message: "ThemeId invalide" });
    }

    next();
}

export default validateTrackMiddleware;
