import userService from "../services/userService.js";

async function activeUserMiddleware(req, res, next) {
    const user = await userService.getUserById(req.auth.userId);

    if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (!user.isActive) {
        return res.status(403).json({ message: "Votre compte a été suspendu" });
    }
    next();
}

export default activeUserMiddleware;
