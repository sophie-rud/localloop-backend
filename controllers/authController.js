import authService from '../services/authService.js';
import userService from '../services/userService.js';
import bcrypt from "bcrypt";

async function signUp (req, res) {
    try {
        const { email, password, username } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const result = await userService.signupUser({ email, password: hash, username });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur interne" });
    }
}

//signIn with generation and sending of the JWT in a cookie
async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.signIn(email, password);

        res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // = true in production
                sameSite: "Strict",
                maxAge: 10 * 60 * 1000 // 10 minutes
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            .status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                    isActive: user.isActive,
                    roleId: user.roleId,
                    createdTracks: user.createdTracks,
                }
            });
    } catch (error) {
        res.status(401).json({ message: error.message || "Authentification échouée" });
    }
}

const getRefreshToken = async (req, res) => {
    try {
        const { userId, email } = req.refreshPayload;
        const { accessToken, refreshToken } = await authService.refresh(userId, email);

        res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // = true in production
                sameSite: "Strict",
                maxAge: 10 * 60 * 1000 // 10 minutes
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            .status(200).json({ message: "Token rafraîchi avec succès" });
    } catch (error) {
        res.status(401).json({ error: error.message || "Impossible de renouveler le token" });
    }
};

async function logout(req, res) {
    try {
        const { userId } = req.refreshPayload;

        await authService.logout(userId);

        res
            .cookie("refreshToken", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // = true in production
                sameSite: "Strict",
                maxAge: 0,
            })
            .status(200)
            .json({ message: "Déconnexion réussie" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur lors de la déconnexion" });
    }
}

export default {
    signUp,
    signIn,
    getRefreshToken,
    logout,
}
