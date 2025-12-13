import prisma from '../config/prisma.js';

async function findAll() {
    const places = await prisma.place.findMany();
    return places;
}

async function findById(id) {
    const place = await prisma.place.findUnique({
        where: { id: parseInt(id) }
    });

    return place;
}

async function createPlace(data) {
    const newPlace = await prisma.place.create({ data });
    return newPlace;
}

async function updatePlace(id, data) {
    const updatedPlace = await prisma.place.update({
        where: { id: parseInt(id) },
        data
    });
    return updatedPlace;
}

async function deletePlace(id) {
    await prisma.place.delete({
        where: { id: parseInt(id) }
    });
}

export default {
    findAll,
    findById,
    createPlace,
    updatePlace,
    deletePlace,
};
