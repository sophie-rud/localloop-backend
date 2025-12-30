import userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";

async function getAllUsers() {
    return await userRepository.findAll();
}

async function getUserById(id) {
    return await userRepository.findById(id);
}

async function getUserByEmail(email) {
    return await userRepository.findByEmail(email);
}

async function signupUser(user) {
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

async function createUserByAdmin(user) {
    const { email, username, roleId, isActive } = user;

    const tempPassword = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

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

    return await userRepository.createUser({
        email,
        username,
        roleId: roleId ?? 1,
        isActive: isActive ?? true,
        password: hashedPassword,
    });
}

async function editUserByAdmin(id, data) {
    const { email, username } = data;
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

    return await userRepository.updateUser(id, data);
}

async function removeUser(id) {
    return await userRepository.deleteUser(id);
}

async function getUserProfile(email) {
    return userRepository.findByEmail(email, {includeTracks: true});
}

async function editProfile(id, data) {
    const { email, username, avatar } = data;
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

    return await userRepository.updateUser(id, data);
}

async function removeProfile(id) {
    return await userRepository.deleteUser(id);
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    signupUser,
    createUserByAdmin,
    editUserByAdmin,
    removeUser,
    getUserProfile,
    editProfile,
    removeProfile,
}
