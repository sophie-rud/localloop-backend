function validatePlaceMiddleware(req, res, next) {
    const { name, latitude, longitude, departmentId, city, description } = req.body;

    // Name validation
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: "Compléter le nom du lieu" });
    }

    // Latitude validation
    const latitudeNum = Number(latitude);
    if (isNaN(latitudeNum) || latitudeNum < -90 || latitudeNum > 90) {
        return res.status(400).json({ message: "Latitude invalide (doit être entre -90 et 90)" });
    }

    // Longitude validation
    const longitudeNum = Number(longitude);
    if (isNaN(longitudeNum) || longitudeNum < -180 || longitudeNum > 180) {
        return res.status(400).json({ message: "Longitude invalide (doit être entre -180 et 180)" });
    }

    // DepartmentId validation
    const departmentIdNum = parseInt(departmentId);
    if (!departmentId || isNaN(departmentIdNum) || departmentIdNum < 1) {
        return res.status(400).json({ message: "Dans quel département se trouve ce lieu ?" });
    }

    // Optional fields
    if (city && typeof city !== "string") {
        return res.status(400).json({ message: "Ville doit être un texte" });
    }

    if (description && typeof description !== "string") {
        return res.status(400).json({ message: "Description doit être un texte" });
    }

    next();
}

export default validatePlaceMiddleware;
