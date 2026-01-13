function adminRoleMiddleware(req, res, next) {
    if (req.auth.roleId !== 2) {
        return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
    }
    next();
}

export default adminRoleMiddleware;
