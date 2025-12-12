import trackRepository from '../repositories/trackRepository.js';

async function getAllTracks() {
    return await trackRepository.findAll();
}

async function getTrackById(id) {
    return await trackRepository.findById(id);
}

async function createTrack(track) {
    const { title } = track;

    if(!title) {
        throw new Error("Vous avez oublié le titre du parcours !");
    }

    return await trackRepository.createTrack(track);
}

async function editTrack(id, data) {
    const { title } = data;

    if(!title) {
        throw new Error("Vous avez oublié le titre du parcours !");
    }

    return await trackRepository.updateTrack(id, data);
}

async function removeTrack(id) {
    return await trackRepository.deleteTrack(id);
}

export default {
    getAllTracks,
    getTrackById,
    createTrack,
    editTrack,
    removeTrack,
}
