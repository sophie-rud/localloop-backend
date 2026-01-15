import userRepository from '../repositories/userRepository.js';
import jwt from "jsonwebtoken";

async function signIn(email) {
    const user = await userRepository.findByEmail(email, {includeTracks: true});

    const accessToken = jwt.sign(
        { sub: email, userId: user.id, roleId: user.roleId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
        { sub: email, userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    await userRepository.saveRefreshToken(refreshToken, { userId: user.id });

    return { accessToken, refreshToken, user };
}

async function refresh(userId, email) {
    const user = await userRepository.findById(userId);

    if (!user || !user.refreshToken) {
        throw new Error("Session invalide");
    }

    const accessToken = jwt.sign(
        { sub: email, userId: userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
        { sub: email, userId: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    await userRepository.saveRefreshToken(refreshToken, { userId, email });

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
