import themeRepository from '../repositories/themeRepository.js';

async function getAllThemes() {
    return await themeRepository.findAll();
}

async function getThemeById(id) {
    return await themeRepository.findById(id);
}

export default {
    getAllThemes,
    getThemeById,
}
