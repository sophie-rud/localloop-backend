import trackRepository from '../repositories/trackRepository.js';
import trackFilters from '../utils/trackFilters.js';

async function getFilteredTracks(filters) {
    const tracks = await trackRepository.findAll();

    return trackFilters.applyFilters(tracks, filters);
}

async function getTrackById(id) {
    return await trackRepository.findById(id);
}

async function createTrack(track) {
    return await trackRepository.createTrack(track);
}

async function editTrack(id, data) {
    return await trackRepository.updateTrack(id, data);
}

async function removeTrack(id) {
    return await trackRepository.deleteTrack(id);
}

async function getTracksByUser(userId) {
    return await trackRepository.findByUserId(userId);
}

export default {
    getFilteredTracks,
    getTrackById,
    createTrack,
    editTrack,
    removeTrack,
    getTracksByUser,
}
