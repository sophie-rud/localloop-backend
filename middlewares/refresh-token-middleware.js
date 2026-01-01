import jwt from 'jsonwebtoken';
import userService from '../services/userService.js';

const refreshTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            throw Error("Token manquant");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await userService.getUserByEmail(decodedToken.sub);

        if (token !== user.refreshToken) {
            throw Error("Token invalide");
        }

        req.refreshPayload = { email: decodedToken.sub, userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error('Erreur dans refreshTokenMiddleware:', error.message);
        res.status(401).json({ error: error.message });
    }
};

export default refreshTokenMiddleware;