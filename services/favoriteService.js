import favoriteRepository from '../repositories/favoriteRepository.js';

async function getUserFavoritesIds(userId) {
    return await favoriteRepository.findFavoritesIdsByUserId(userId);
}

async function getUserFavoritesWithDetails(userId) {
    return await favoriteRepository.findFavoritesDetailsByUserId(userId);
}

async function addFavorite(userId, trackId) {
    return await favoriteRepository.createFavorite(userId, trackId);
}

async function removeFavorite(userId, trackId) {
    return await favoriteRepository.deleteFavorite(userId, trackId);
}

export default {
    getUserFavoritesIds,
    getUserFavoritesWithDetails,
    addFavorite,
    removeFavorite,
}
