import placeService from '../services/placeService.js';

async function getAllPlaces(req, res) {
    try {
        const places = await placeService.getAllPlaces();
        res.json(places);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getPlaceById(req, res) {
    const id = parseInt(req.params.id)

    try {
        const place = await placeService.getPlaceById(id);
        res.json(place);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

async function createPlace(req, res) {
    try {
        const placeData = placeDataBuilder(req.body, req.file);

        const newPlace = await placeService.createPlace(placeData);

        res.status(201).json({ newPlace,  message: "Lieu créé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editPlace(req, res) {
    try {
        const id = parseInt(req.params.id);
        const updatedPlaceData = placeDataBuilder(req.body, req.file);

        const updatedPlace = await placeService.editPlace(id, updatedPlaceData);

        res.status(201).json({ updatedPlace, message: "Lieu modifié avec succès" });
    } catch (error) {
        console.error("Erreur lors de la modification du lieu :", error);
        res.status(400).json({ error: error.message });
    }
}

async function removePlace(req, res) {
    const id = parseInt(req.params.id)

    try {
        await placeService.removePlace(id);
        res.status(201).json({ message: "Lieu supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getAllPlaces,
    getPlaceById,
    createPlace,
    editPlace,
    removePlace,
}
