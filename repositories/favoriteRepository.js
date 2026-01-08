import prisma from '../config/prisma.js';

async function findByUserId(userId) {
    const favorites = await prisma.favoriteTracks.findMany({
        where: {
            userId: parseInt(userId),
        },
        select: {
            trackId: true,
        },
    });

    return favorites.map(f => f.trackId);
}

async function createFavorite(userId, trackId) {
    const newFavorite = await prisma.favoriteTracks.create({
        data: {
            userId: parseInt(userId),
            trackId: parseInt(trackId),
        }
    });

    return newFavorite;
}

async function deleteFavorite(userId, trackId) {
    await prisma.favoriteTracks.delete({
        where: {
            userId_trackId: {
                userId: parseInt(userId),
                trackId: parseInt(trackId),
            }
        }
    });
}

export default {
    findByUserId,
    createFavorite,
    deleteFavorite,
};
