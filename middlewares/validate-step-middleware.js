function validateStepMiddleware(req, res, next) {
    const { name, placeId, stepOrder } = req.body;

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

    next();
}

export default validateStepMiddleware;
