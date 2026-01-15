import themeService from '../services/themeService.js';

async function getAllThemes(req, res, next) {
    try {
        const themes = await themeService.getAllThemes();
        res.json(themes);
    } catch (error) {
        next(error);
    }
}

async function getThemeById(req, res, next) {
    const id = parseInt(req.params.id)

    try {
        const theme = await themeService.getThemeById(id);
        res.json(theme);
    } catch (error) {
        next(error);
    }
}

export default {
    getAllThemes,
    getThemeById,
}
