import placeRepository from '../repositories/placeRepository.js';

async function getAllPlaces() {
    return await placeRepository.findAll();
}

async function getPlaceById(id) {
    return await placeRepository.findById(id);
}

async function createPlace(place) {
    const { name, latitude, longitude, departmentId } = place;

    if(!name) {
        throw new Error("Compléter le nom du lieu.");
    }
    if(!latitude || !longitude) {
        throw new Error("Indiquer une latitude et une longitude.");
    }
    if(!departmentId) {
        throw new Error("Dans quel département se trouve ce lieu ?");
    }

    return await placeRepository.createPlace(place);
}

async function editPlace(id, data) {
    const { name, latitude, longitude, departmentId } = data;

    if(!name) {
        throw new Error("Compléter le nom du lieu.");
    }
    if(!latitude || !longitude) {
        throw new Error("Indiquer une latitude et une longitude.");
    }
    if(!departmentId) {
        throw new Error("Dans quel département se trouve ce lieu ?");
    }

    return await placeRepository.updatePlace(id, data);
}

async function removePlace(id) {
    return await placeRepository.deletePlace(id);
}

export default {
    getAllPlaces,
    getPlaceById,
    createPlace,
    editPlace,
    removePlace,
}
