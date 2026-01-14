import prisma from '../config/prisma.js';

async function findAll() {
    const steps = await prisma.step.findMany();
    return steps;
}

async function findAllByTrackId(trackId) {
    const steps = await prisma.step.findMany({
        where: { trackId: parseInt(trackId) },
        orderBy: { stepOrder: 'asc' }
    });
    return steps;
}

async function findById(stepId) {
    const step = await prisma.step.findUnique({
        where: { id: parseInt(stepId) }
    });

    return step;
}

async function findByIdAndTrack(stepId, trackId) {
    const step =  await prisma.step.findFirst({
        where: {
            id: parseInt(stepId),
            trackId: parseInt(trackId),
        },
    });

    return step;
}

async function createStep(data) {
    const newStep = await prisma.step.create({ data });
    return newStep;
}

async function updateStep(stepId, trackId, data) {
    const updatedStep = await prisma.step.update({
        where: {
            id: parseInt(stepId),
            trackId: parseInt(trackId),
        },
        data
    });

    return updatedStep;
}

async function deleteStep(stepId, trackId) {
    await prisma.step.delete({
        where: {
            id: parseInt(stepId),
            trackId: parseInt(trackId),
        }
    });
}

async function switchStepOrders(stepAId, stepAOrder, stepBId, stepBOrder) {
    await prisma.$transaction([
        // Temporary update to avoid unique constraint conflicts
        prisma.step.update({
            where: { id: stepAId },
            data: { stepOrder: -1 }
        }),
        prisma.step.update({
            where: { id: stepBId },
            data: { stepOrder: stepAOrder }
        }),
        prisma.step.update({
            where: { id: stepAId },
            data: { stepOrder: stepBOrder }
        })
    ]);
}

async function countByTrackId(trackId) {
    return prisma.step.count({
        where: { trackId }
    });
}

export default {
    findAll,
    findAllByTrackId,
    findById,
    findByIdAndTrack,
    createStep,
    updateStep,
    deleteStep,
    switchStepOrders,
    countByTrackId,
};
