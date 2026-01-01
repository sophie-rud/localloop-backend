import prisma from '../config/prisma.js';

async function findAll() {
    const users = await prisma.user.findMany();
    return users;
}

async function findById(id) {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    });

    return user;
}

async function findByEmail(email, options = {}) {
    const { includeTracks = false } = options;

    const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
            ...(includeTracks && {
                createdTracks: {
                    include: {
                        steps: {
                            include: {
                                place: {
                                    include: {
                                        department: true,
                                    },
                                }
                            },
                        },
                        theme: true
                    },
                },
            }),
        }
    });

    return user;
}

async function createUser(data) {
    const newUser = await prisma.user.create({ data });
    return newUser;
}

async function updateUser(id, data) {
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data
    });

    return updatedUser;
}

async function deleteUser(id) {
    await prisma.user.delete({
        where: { id: parseInt(id) }
    });
}

async function saveRefreshToken(refreshToken, { userId, email }) {
    if (!userId && !email) throw new Error("userId ou email requis");

    await prisma.user.update({
         where: userId ? { id: parseInt(userId) } : { email },
         data: { refreshToken },
    })
}

async function findByResetToken(token) {
    return prisma.user.findFirst({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: { gt: new Date() },
        },
    });
}

async function updateResetToken(userId, token, expiresAt) {
    return prisma.user.update({
        where: {id: userId},
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: expiresAt
        }
    });
}

async function updatePassword(userId, hashedPassword) {
    return prisma.user.update({
        where: {id: userId},
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }
    });
}


export default {
    findAll,
    findById,
    findByEmail,
    createUser,
    updateUser,
    deleteUser,
    saveRefreshToken,
    findByResetToken,
    updateResetToken,
    updatePassword,
};
