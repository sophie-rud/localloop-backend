import userRepository from '../repositories/userRepository.js';

async function getAllUsers() {
    return await userRepository.findAll();
}

async function getUserById(id) {
    return await userRepository.findById(id);
}

async function getUserByEmail(email) {
    return await userRepository.findByEmail(email);
}

async function createUser(user) {
    const { email, username, password } = user;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email) {
        throw new Error("L'email est obligatoire");
    }
    if (!emailRegex.test(email)) {
        throw new Error("Email invalide");
    }
    if(!username) {
        throw new Error("Le nom d'utilisateur est obligatoire");
    }
    if(!password) {
        throw new Error("Le mot de passe est obligatoire");
    }

    return await userRepository.createUser({
        email,
        username,
        password,
        roleId: 1
    });
}

async function editUser(id, data) {
    const { email, username, password } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email) {
        throw new Error("L'email est obligatoire");
    }
    if (!emailRegex.test(email)) {
        throw new Error("Email invalide");
    }
    if(!username) {
        throw new Error("Le nom d'utilisateur est obligatoire");
    }
    if(!password) {
        throw new Error("Le mot de passe est obligatoire");
    }

    return await userRepository.updateUser(id, data);
}

async function removeUser(id) {
    return await userRepository.deleteUser(id);
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    editUser,
    removeUser,
}
