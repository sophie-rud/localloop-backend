import userService from '../services/userService.js';
import trackService from '../services/trackService.js';

async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    const id = parseInt(req.params.id)

    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Build a clean user data object from the request
function userDataBuilder(body) {
    const {
        username,
        email,
        roleId,
        isActive
    } = body;

    return {
        username,
        email,
        roleId: parseInt(roleId),
        isActive: isActive === true,
    };
}

async function createUser(req, res, next) {
    try {
        const userData = userDataBuilder(req.body);

        const newUser = await userService.createUserByAdmin(userData);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

async function editUser(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const userData = userDataBuilder(req.body);

        const updatedUser = await userService.editUserByAdmin(id, userData);

        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function toggleBlockUser(req, res, next) {
    try {
        const updatedUser = await userService.toggleBlockUser(req.params.id);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function removeUser(req, res, next) {
    const id = parseInt(req.params.id)

    try {
        await userService.removeUser(id);
        res.status(201).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        next(error);
    }
}

async function getProfile(req, res, next) {
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
        next(error);
    }
}

async function editProfile(req, res, next) {
    try {
        const userId = req.auth.userId;
        const { username, email } = req.body;

        const updatedData = {
            username,
            email,
        };

        if (req.file) {
            updatedData.avatar = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await userService.editProfile(userId, updatedData);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Erreur lors de la modification du profil :", error);
        next(error);
    }
}

async function removeProfile(req, res, next) {
    try {
        const userId = req.auth.userId;

        await userService.removeProfile(userId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

async function getUserTracks(req, res, next) {
    try {
        const userId = Number(req.auth.userId);

        const tracks = await trackService.getTracksByUser(userId);
        res.json(tracks);
    } catch (err) {
        next(err);
    }
}


export default {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    toggleBlockUser,
    removeUser,
    getProfile,
    editProfile,
    removeProfile,
    getUserTracks,
}
