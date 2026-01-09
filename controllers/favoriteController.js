import favoriteService from "../services/favoriteService.js";

async function getUserFavoritesIds(req, res) {
    const userId = req.auth.userId;

    try {
        const favoritesIds = await favoriteService.getUserFavoritesIds(userId);
        res.json(favoritesIds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserFavoritesWithDetails(req, res) {
    const userId = req.auth.userId;

    try {
        const favorites = await favoriteService.getUserFavoritesWithDetails(userId);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addFavorite(req, res) {
    const userId = req.auth.userId;
    const trackId = parseInt(req.params.trackId);

    if (!req.auth.userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    try {
        const favorite = await favoriteService.addFavorite(userId, trackId);
        res.status(201).json({ message: 'Favori ajouté', favorite, trackId });
    } catch (error) {
        console.error('Erreur addFavorite:', error);
        res.status(500).json({ error: error.message });
    }
}

async function removeFavorite(req, res) {
    const userId = req.auth.userId;
    const trackId = parseInt(req.params.trackId);

    try {
        await favoriteService.removeFavorite(userId, trackId);
        res.status(204).send();
    } catch (error) {
        console.error('Erreur removeFavorite:', error);
        res.status(500).json({ error: error.message });
    }
}

export default {
    getUserFavoritesIds,
    getUserFavoritesWithDetails,
    addFavorite,
    removeFavorite,
}
