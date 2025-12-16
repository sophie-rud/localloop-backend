import prisma from '../config/prisma.js';

async function findAll() {
    const departments = await prisma.department.findMany();
    return departments;
}

async function findById(id) {
    const department = await prisma.department.findUnique({
        where: { id: parseInt(id) }
    });

    return department;
}

export default {
    findAll,
    findById,
};
