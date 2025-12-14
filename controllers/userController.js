import userService from '../services/userService.js';

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    const id = parseInt(req.params.id)

    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ newUser,  message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editUser(req, res) {
    const id = parseInt(req.params.id);

    try {
        const updatedUser = await userService.editUser(id, req.body);
        res.status(201).json({ updatedUser, message: "Utilisateur modifié avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function removeUser(req, res) {
    const id = parseInt(req.params.id)

    try {
        await userService.removeUser(id);
        res.status(201).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    removeUser,
}
