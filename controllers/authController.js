import authService from '../services/authService.js';
import userService from '../services/userService.js';
import bcrypt from "bcrypt";

async function signUp (req, res) {
    try {
        const { email, password, username } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const result = await userService.createUser({ email, password: hash, username });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message || "Erreur interne" });
    }
}

//signIn avec vérification sur l'en-tête
async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await authService.signIn(email, password);

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json({ accessToken });
    } catch (error) {
        res.status(401).json({ message: error.message || "Authentification échouée" });
    }
}

const getRefreshToken = async (req, res) => {
    try {
        const { userId } = req.refreshPayload;
        const { accessToken, refreshToken } = await authService.refresh(userId);

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json({ accessToken });
    } catch (error) {
        res.status(401).json({ message: "Impossible de renouveler le token", error });
    }
};

async function getProfile(req, res) {
    const email = req.auth.email;

    try {
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function logout(req, res) {
    try {
        const { userId } = req.refreshPayload;

        await authService.logout(userId);

        res
            .cookie("refreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
            })
            .status(200)
            .json({ message: "Déconnexion réussie" });
    } catch (error) {
        res.status(401).json({ message: error.message || "Authentification échouée" });
    }
}

export default {
    signUp,
    signIn,
    getRefreshToken,
    getProfile,
    logout,
}
