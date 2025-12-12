import prisma from '../config/prisma.js';

async function findAll() {
    const tracks = await prisma.track.findMany();
    return tracks;
}

async function findById(id) {
    const track = await prisma.track.findUnique({
        where: { id: parseInt(id) }
    });

    return track;
}

async function createTrack(data) {
    const newTrack = await prisma.track.create({ data });
    return newTrack;
}

async function updateTrack(id, data) {
    const updatedTrack = await prisma.track.update({
        where: { id: parseInt(id) },
        data
    });

    return updatedTrack;
}

async function deleteTrack(id) {
    await prisma.track.delete({
        where: { id: parseInt(id) }
    });
}

export default {
    findAll,
    findById,
    createTrack,
    updateTrack,
    deleteTrack,
};
