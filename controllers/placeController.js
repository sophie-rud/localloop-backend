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

async function createPlace(req, res) {
    try {
        const placeData = req.body;

        if (req.file) {
            placeData.photo = `/uploads/${req.file.filename}`;
        }

        const newPlace = await placeService.createPlace(placeData);
        res.status(201).json({ newPlace,  message: "Lieu créé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editPlace(req, res) {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;

        if (req.file) {
            updatedData.photo = `/uploads/${req.file.filename}`;
        }

        const updatedPlace = await placeService.editPlace(id, updatedData);
        res.status(201).json({ updatedPlace, message: "Lieu modifié avec succès" });
    } catch (error) {
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
