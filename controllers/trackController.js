import trackService from '../services/trackService.js';

async function getAllTracks(req, res) {
    try {
        const tracks = await trackService.getAllTracks();
        res.json(tracks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getTrackById(req, res) {
    const id = parseInt(req.params.id)

    try {
        const track = await trackService.getTrackById(id);
        res.json(track);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function createTrack(req, res) {
    try {
        const newTrack = await trackService.createTrack(req.body);
        res.status(201).json({ newTrack,  message: "Parcours créé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editTrack(req, res) {
    const id = parseInt(req.params.id);

    try {
        const updatedTrack = await trackService.editTrack(id, req.body);
        res.status(201).json({ updatedTrack, message: "Parcours modifié avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function removeTrack(req, res) {
    const id = parseInt(req.params.id)

    try {
        await trackService.removeTrack(id);
        res.status(201).json({ message: "Parcours supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getAllTracks,
    getTrackById,
    createTrack,
    editTrack,
    removeTrack,
}
