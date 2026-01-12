import trackService from '../services/trackService.js';

async function getAllTracks(req, res) {
    try {
        const { query, difficulty, duration, distance } = req.query;

        const filters = {
            query: query?.trim() || null,
            difficulty: difficulty?.trim() || null,
            duration: duration?.trim() || null,
            distance: distance?.trim() || null,
        };

        const tracks = await trackService.getFilteredTracks(filters);

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

// Build a clean track data object from the request
function trackDataBuilder(body, file) {
    const {
        title,
        distance,
        duration,
        difficulty,
        presentation,
        isPublished,
        themeId
    } = body;

    const data = {
        title,
        distance: Number(distance),
        duration: Number(duration),
        difficulty,
        presentation,
        isPublished: isPublished === "true",
        themeId: parseInt(themeId)
    };

    if (file) {
        data.photo = `/uploads/${file.filename}`;
    }

    return data;
}

async function createTrack(req, res) {
    try {
        const trackData = trackDataBuilder(req.body, req.file);

        const newTrack = await trackService.createTrack({
            ...trackData,
            userId: req.auth.userId,
        });

        res.status(201).json(newTrack);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editTrack(req, res) {
    try {
        const id = parseInt(req.params.id);
        const updatedTrackData = trackDataBuilder(req.body, req.file);

        const updatedTrack = await trackService.editTrack(id, updatedTrackData);

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
