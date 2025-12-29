import stepService from '../services/stepService.js';

async function getAllSteps(req, res) {
    try {
        const steps = await stepService.getAllSteps();
        res.json(steps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllStepsByTrack(req, res) {
    const trackId = parseInt(req.params.trackId);

    try {
        const steps = await stepService.getAllStepsByTrack(trackId);
        res.json(steps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getStepById(req, res) {
    const id = parseInt(req.params.id);

    try {
        const step = await stepService.getStepById(id);
        res.json(step);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getStepByIdAndTrack(req, res) {
    const { trackId, id: stepId } = req.params;

    try {
        const step = await stepService.getStepByIdAndTrack(stepId, trackId);
        res.json(step);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function createStep(req, res) {
    try {
        const { trackId } = req.params;
        const stepData = req.body;

        if (req.file) {
            stepData.photo = `/uploads/${req.file.filename}`;
        }

        const newStep = await stepService.createStep(parseInt(trackId), stepData);
        res.status(201).json(newStep);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editStep(req, res) {
    try {
        const trackId = parseInt(req.params.trackId);
        const stepId = parseInt(req.params.id);

        const {
            placeId,
            name,
            stepOrder,
            anecdote,
            advice,
        } = req.body;

        const updatedData = {
            placeId: parseInt(placeId),
            name,
            stepOrder: parseInt(stepOrder),
            anecdote,
            advice,
        };

        if (req.file) {
            updatedData.photo = `/uploads/${req.file.filename}`;
        }

        const updatedStep = await stepService.editStep(stepId, trackId, updatedData);
        res.status(201).json({ updatedStep, message: "Etape modifiée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la modification de l'étape :", error);
        res.status(400).json({ error: error.message });
    }
}

async function removeStep(req, res) {
    const { trackId, id: stepId } = req.params;

    try {
        await stepService.removeStep(stepId, trackId);
        res.status(201).json({ message: "Etape supprimée avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getAllSteps,
    getAllStepsByTrack,
    getStepById,
    getStepByIdAndTrack,
    createStep,
    editStep,
    removeStep,
}
