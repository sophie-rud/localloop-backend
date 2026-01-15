import bcrypt from 'bcrypt';
import userService from '../services/UserService.js';

async function loginMiddleware(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({message: "Utilisateur non trouvé"});
        }

        if (!user.isActive) {
            return res.status(403).json({message: "Votre compte a été suspendu"});
        }

        const isVerify = await bcrypt.compare(password, user.password);
        if (!isVerify) {
            return res.status(401).json({message: "Email ou mot de passe incorrect"});
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

export default loginMiddleware;
