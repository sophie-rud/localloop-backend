import themeService from '../services/themeService.js';

async function getAllThemes(req, res) {
    try {
        const themes = await themeService.getAllThemes();
        res.json(themes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getThemeById(req, res) {
    const id = parseInt(req.params.id)

    try {
        const theme = await themeService.getThemeById(id);
        res.json(theme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getAllThemes,
    getThemeById,
}
