function validateEmailUsernameMiddleware(req, res, next) {
    const { email, username } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email || email.trim() === '') {
        return res.status(400).json({ message: "L'email est obligatoire" });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email invalide" });
    }

    // Username validation
    if (!username || username.trim() === '') {
        return res.status(400).json({ message: "Le nom d'utilisateur est obligatoire" });
    }

    next();
}

export default validateEmailUsernameMiddleware;
