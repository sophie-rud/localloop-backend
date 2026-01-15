import placeService from '../services/placeService.js';

async function getAllPlaces(req, res, next) {
    try {
        const places = await placeService.getAllPlaces();
        res.json(places);
    } catch (error) {
        next(error);
    }
}

async function getPlaceById(req, res, next) {
    const id = parseInt(req.params.id)

    try {
        const place = await placeService.getPlaceById(id);
        res.json(place);
    } catch (error) {
        next(error);
    }
}

// Build a clean place data object from the request
function placeDataBuilder(body, file) {
    const {
        name,
        city,
        description,
        departmentId,
        latitude,
        longitude,
    } = body;

    const data = {
        name,
        city,
        description,
        departmentId: parseInt(departmentId),
        latitude: Number(latitude),
        longitude: Number(longitude),
    };

    if (file) {
        data.photo = `/uploads/${file.filename}`;
    }

    return data
}

async function createPlace(req, res, next) {
    try {
        const placeData = placeDataBuilder(req.body, req.file);

        const newPlace = await placeService.createPlace(placeData);

        res.status(201).json({ newPlace,  message: "Lieu créé avec succès" });
    } catch (error) {
        next(error);
    }
}

async function editPlace(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const updatedPlaceData = placeDataBuilder(req.body, req.file);

        const updatedPlace = await placeService.editPlace(id, updatedPlaceData);

        res.status(201).json({ updatedPlace, message: "Lieu modifié avec succès" });
    } catch (error) {
        console.error("Erreur lors de la modification du lieu :", error);
        next(error);
    }
}

async function removePlace(req, res, next) {
    const id = parseInt(req.params.id)

    try {
        await placeService.removePlace(id);
        res.status(201).json({ message: "Lieu supprimé avec succès" });
    } catch (error) {
        next(error);
    }
}

export default {
    getAllPlaces,
    getPlaceById,
    createPlace,
    editPlace,
    removePlace,
}
