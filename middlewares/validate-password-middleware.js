function validatePasswordMiddleware(req, res, next) {
    const { password } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!password) {
        return res.status(400).json({ message: "Le mot de passe est obligatoire" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre"
        });
    }

    next();
}

export default validatePasswordMiddleware;
