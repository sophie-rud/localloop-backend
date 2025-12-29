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
        const trackData = req.body;

        if (req.file) {
            trackData.photo = `/uploads/${req.file.filename}`;
        }

        const newTrack = await trackService.createTrack(trackData);
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editTrack(req, res) {
    try {
        const id = parseInt(req.params.id);

        const {
            title,
            distance,
            duration,
            difficulty,
            presentation,
            isPublished,
            themeId
        } = req.body;

        const updatedData = {
            title,
            distance: Number(distance),
            duration: Number(duration),
            difficulty,
            presentation,
            isPublished: isPublished === "true",
            themeId: parseInt(themeId)
        };

        if (req.file) {
            updatedData.photo = `/uploads/${req.file.filename}`;
        }

        const updatedTrack = await trackService.editTrack(id, updatedData);
        res.status(201).json({ updatedTrack, message: "Parcours modifié avec succès" });
    } catch (error) {
        console.error("Erreur lors de la modification du parcours :", error);
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
