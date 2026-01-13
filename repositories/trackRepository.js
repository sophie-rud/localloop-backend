import prisma from '../config/prisma.js';

async function findAll() {
    const tracks = await prisma.track.findMany({
        where: { isPublished: true },
        include: {
            steps: {
                include: {
                    place: {
                        include: {
                            department: true
                        }
                    }
                }
            },
            theme: true
        },
    });
    return tracks;
}

async function findById(id) {
    const track = await prisma.track.findUnique({
        where: { id: parseInt(id) },
        include: {
            steps: {
                orderBy: { stepOrder: 'asc' },
                include: {
                    place: {
                        include: {
                            department: true,
                        },
                    }
                },
            },
            theme: true
        },
    });

    return track;
}

async function findByUserId(userId) {
    const userTracks = await prisma.track.findMany({
        where: { userId: parseInt(userId) },
        include: {
            steps: {
                orderBy: { stepOrder: 'asc' },
                include: {
                    place: {
                        include: {
                            department: true,
                        },
                    }
                },
            },
            theme: true
        },
    });

    return userTracks;
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
    findByUserId,
    createTrack,
    updateTrack,
    deleteTrack,
};
