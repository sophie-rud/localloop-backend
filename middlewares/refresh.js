import jwt from 'jsonwebtoken';
import userService from '../services/userService.js';

const refresh = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) throw "Token manquant";

        const decodedToken = jwt.verify(token, "refreshSecret");
        const user = await userService.getUserByEmail(decodedToken.sub);

        if (token !== user.refreshToken) throw "Token invalide";

        req.refreshPayload = { email: decodedToken.sub, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};

export default refresh;