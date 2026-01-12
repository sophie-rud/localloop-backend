function validateStepMiddleware(req, res, next) {
    const { name, placeId, stepOrder, anecdote, advice } = req.body;

    // Name validation
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: "Le nom de l'étape est obligatoire" });
    }

    // PlaceId validation
    const placeIdNum = parseInt(placeId);
    if (!placeId || isNaN(placeIdNum) || placeIdNum < 1) {
        return res.status(400).json({ message: "PlaceId invalide" });
    }

    // StepOrder validation
    if (!stepOrder || isNaN(stepOrder) || stepOrder < 1) {
        return res.status(400).json({ message: "Numéro d'étape invalide" });
    }

    // Optional fields
    if (anecdote && typeof anecdote !== "string") {
        return res.status(400).json({ message: "Anecdote doit être un texte" });
    }

    if (advice && typeof advice !== "string") {
        return res.status(400).json({ message: "Conseil doit être un texte" });
    }

    next();
}

export default validateStepMiddleware;
