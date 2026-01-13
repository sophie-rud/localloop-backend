import jwt from "jsonwebtoken";

// JWT retrieval
const auth = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw new Error("Non autorisé");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.auth = { email: decodedToken.sub, userId: decodedToken.userId, roleId: decodedToken.roleId };

        next();
    } catch (error) {
        res.status(401).json({ message: "Authentification échouée" , error });
    }
}

export default auth;
