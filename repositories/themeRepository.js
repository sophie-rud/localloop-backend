import prisma from '../config/prisma.js';

async function findAll() {
    const themes = await prisma.theme.findMany();
    return themes;
}

async function findById(id) {
    const theme = await prisma.theme.findUnique({
        where: { id: parseInt(id) }
    });

    return theme;
}

export default {
    findAll,
    findById,
};
