import userRepository from '../repositories/userRepository.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(email, password) {
    const user = await userRepository.findByEmail(email, {includeTracks: true});

    if (!user) {
        throw new Error ("Utilisateur non trouvé");
    }

    const isVerify = await bcrypt.compare(password, user.password);

    if (!isVerify) {
        throw new Error ("Non autorisé");
    }

    const accessToken = jwt.sign(
        { sub: email, userId: user.id },
        "process.env.JWT_ACCESS_SECRET",
        { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
        { sub: email, userId: user.id },
        "process.env.JWT_REFRESH_SECRET",
        { expiresIn: "7d" }
    );

    await userRepository.saveRefreshToken(refreshToken, { email });

    return { accessToken, refreshToken, user };
}

async function refresh(userId, email) {
    const user = await userRepository.findById(userId);

    if (!user || !user.refreshToken) {
        throw new Error("Session invalide");
    }

    const accessToken = jwt.sign(
        { sub: email, userId: userId },
        "process.env.JWT_ACCESS_SECRET",
        { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
        { sub: email, userId: userId },
        "process.env.JWT_REFRESH_SECRET",
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
