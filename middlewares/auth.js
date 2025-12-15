import jwt from "jsonwebtoken";

// récupération du JWT depuis les en-têtes
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret');

        req.auth = { email: decodedToken.sub, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({error});
    }
}

export default auth;
