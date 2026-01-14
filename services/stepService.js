import stepRepository from '../repositories/stepRepository.js';
import trackRepository from '../repositories/trackRepository.js';

async function getAllSteps() {
    return await stepRepository.findAll();
}

async function getAllStepsByTrack(trackId) {
    const track = await trackRepository.findById(trackId);

    if (!track) {
        throw new Error("Parcours non trouvé");
    }

    return await stepRepository.findAllByTrackId(trackId);
}

async function getStepById(id) {
    return await stepRepository.findById(id);
}

async function getStepByIdAndTrack(stepId, trackId) {
    const step = await stepRepository.findByIdAndTrack(stepId, trackId);

    if (!step) {
        throw new Error("Étape non trouvée pour ce parcours");
    }

    return step;
}

async function createStep(trackId, step) {
    const { name, placeId, stepOrder } = step;
    const track = await trackRepository.findById(trackId);

    if (!track) {
        throw new Error("Parcours non trouvé");
    }
    if(!name) {
        throw new Error("Vous avez oublié le nom de l'étape !");
    }
    if(!placeId) {
        throw new Error("Définir un lieu pour l'étape.");
    }
    if (stepOrder !== undefined) {
        if (!Number.isInteger(stepOrder) || stepOrder < 1) {
            throw new Error("Numéro d'étape invalide");
        }
    }

    return await stepRepository.createStep({
        ...step,
        trackId: parseInt(trackId),
    });
}

async function editStep(stepId, trackId, data) {
    const { name, placeId, stepOrder } = data;
    const step = await stepRepository.findByIdAndTrack(stepId, trackId);

    if (!step) {
        throw new Error("Étape non trouvée pour ce parcours");
    }
    if(!name) {
        throw new Error("Vous avez oublié le nom de l'étape !");
    }
    if(!placeId) {
        throw new Error("Définir un lieu pour l'étape.");
    }
    if (stepOrder !== undefined) {
        if (!Number.isInteger(stepOrder) || stepOrder < 1) {
            throw new Error("Numéro d'étape invalide");
        }
    }

    return await stepRepository.updateStep(stepId, trackId, data);
}

async function removeStep(stepId, trackId) {
    const step = await stepRepository.findByIdAndTrack(stepId, trackId);

    if (!step) {
        throw new Error("Étape non trouvée pour ce parcours");
    }

    return await stepRepository.deleteStep(stepId, trackId);
}

async function reorderSteps(trackId, id, direction) {
    const steps = await stepRepository.findAllByTrackId(trackId);

    const currentStep = steps.find(step => step.id === parseInt(id));

    if (!currentStep) {
        throw new Error('Étape non trouvée');
    }

    const currentStepOrder = currentStep.stepOrder;

    if (direction === 'up' && currentStepOrder === 1) {
        throw new Error('\'L\'étape est déjà en première position');
    }

    if (direction === 'down' && currentStepOrder === steps.length) {
        throw new Error('L\'étape est déjà en dernière position');
    }

    const targetStepOrder = direction === 'up' ? currentStepOrder - 1 : currentStepOrder + 1;
    const targetStep = steps.find(step => step.stepOrder === targetStepOrder);

    if (!targetStep) {
        throw new Error('Étape cible non trouvée');
    }

    await stepRepository.switchStepOrders(
        currentStep.id,
        currentStep.stepOrder,
        targetStep.id,
        targetStep.stepOrder
    );

    return await stepRepository.findAllByTrackId(trackId);
}

async function countByTrackId(trackId) {
    return stepRepository.countByTrackId(trackId);
}

export default {
    getAllSteps,
    getAllStepsByTrack,
    getStepById,
    getStepByIdAndTrack,
    createStep,
    editStep,
    removeStep,
    reorderSteps,
    countByTrackId,
}
