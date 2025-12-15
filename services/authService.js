import userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw { message: "Utilisateur non trouvé" };
    }

    const isVerify = await bcrypt.compare(password, user.password);

    if (!isVerify) {
        throw { message: "Non autorisé" };
    }

    const accessToken = jwt.sign(
        { sub: email, userId: user.id },
        "secret",
        { expiresIn: "15min" }
    );
    const refreshToken = jwt.sign(
        { sub: email, userId: user.id },
        "refreshSecret",
        { expiresIn: "7d" }
    );

    await userRepository.saveRefreshToken(refreshToken, { email });

    return { accessToken, refreshToken };
}

async function refresh(userId) {
    const user = await userRepository.findById(userId);

    if (!user || !user.refreshToken) {
        throw new Error("Session invalide");
    }

    const accessToken = jwt.sign(
        { sub: user.email, userId: user.id },
        "secret",
        { expiresIn: "15min" }
    );
    const refreshToken = jwt.sign(
        { sub: user.email, userId: user.id },
        "refreshSecret",
        { expiresIn: "7d" }
    );

    await userRepository.saveRefreshToken(refreshToken, { userId });

    return { accessToken, refreshToken };
}

async function logout(userId) {
    return userRepository.saveRefreshToken(null, { userId });
}

export default {
    signIn,
    refresh,
    logout
}
