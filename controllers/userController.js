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

async function getProfile(req, res) {
    try {
        const email = req.auth.email;

        if (!email) {
            return res.status(401).json({ error: "Utilisateur non authentifié" });
        }

        const user = await userService.getUserProfile(email);

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatar: user.avatar,
                isActive: user.isActive,
                roleId: user.roleId,
                createdTracks: user.createdTracks,
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editProfile(req, res) {
    try {
        const userId = req.auth.userId;
        const updatedData = req.body;

        if (req.file) {
            updatedData.avatar = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await userService.editProfile(userId, updatedData);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function removeProfile(req, res) {
    try {
        const userId = req.auth.userId;

        await userService.removeProfile(userId);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    removeUser,
    getProfile,
    editProfile,
    removeProfile,
}
