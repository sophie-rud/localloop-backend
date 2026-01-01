import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import userRepository from '../repositories/userRepository.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

async function sendResetEmail(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
            <h2>Réinitialisation de mot de passe</h2>
            <p>Cliquez sur le lien ci-dessous :</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>Ce lien expire dans 1 heure.</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

async function requestPasswordReset(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;

    const resetToken = generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1 heure

    await userRepository.updateResetToken(user.id, resetToken, expiresAt);
    await sendResetEmail(email, resetToken);

    return true;
}

async function verifyResetToken(token) {
    return await userRepository.findByResetToken(token);
}

async function resetPassword(token, newPassword) {
    const user = await userRepository.findByResetToken(token);

    if (!user) return null;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updatePassword(user.id, hashedPassword);

    return user;
}

export default {
    requestPasswordReset,
    verifyResetToken,
    resetPassword
}