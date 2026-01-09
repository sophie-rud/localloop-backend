import prisma from '../config/prisma.js';

async function findFavoritesIdsByUserId(userId) {
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

async function findFavoritesDetailsByUserId(userId) {
    const favorites = await prisma.favoriteTracks.findMany({
        where: {
            userId: parseInt(userId),
        },
        include: {
            track: {
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
                }
            }
        },
    });
    return favorites.map(f => f.track);
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
    findFavoritesIdsByUserId,
    findFavoritesDetailsByUserId,
    createFavorite,
    deleteFavorite,
};
