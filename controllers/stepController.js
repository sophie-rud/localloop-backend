import stepService from '../services/stepService.js';

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
    const trackId = parseInt(req.params.trackId);

    try {
        const newStep = await stepService.createStep(trackId, req.body);
        res.status(201).json({ newStep,  message: "Etape créée avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editStep(req, res) {
    const { trackId, id: stepId } = req.params;

    try {
        const updatedStep = await stepService.editStep(stepId, trackId, req.body);
        res.status(201).json({ updatedStep, message: "Etape modifiée avec succès" });
    } catch (error) {
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
    getAllStepsByTrack,
    getStepById,
    getStepByIdAndTrack,
    createStep,
    editStep,
    removeStep,
}
