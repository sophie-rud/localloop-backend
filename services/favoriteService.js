import favoriteRepository from '../repositories/favoriteRepository.js';

async function getUserFavorites(userId) {
    return await favoriteRepository.findByUserId(userId);
}

async function addFavorite(userId, trackId) {
    return await favoriteRepository.createFavorite(userId, trackId);
}

async function removeFavorite(userId, trackId) {
    return await favoriteRepository.deleteFavorite(userId, trackId);
}

export default {
    getUserFavorites,
    addFavorite,
    removeFavorite,
}
