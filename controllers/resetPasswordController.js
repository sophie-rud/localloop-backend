import passwordService from '../services/resetPasswordService.js';

async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;
        await passwordService.requestPasswordReset(email);

        res.status(200).json({
            message: 'Si cet email existe, un lien a été envoyé'
        });
    } catch (error) {
        // console.error('Erreur:', error);
        next(error);
    }
}

async function verifyResetToken(req, res, next) {
    try {
        const user = await passwordService.verifyResetToken(req.params.token);

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré' });
        }

        res.status(200).json({
            message: 'Token valide',
            email: user.email
        });
    } catch (error) {
        // console.error('Erreur:', error);
        next(error);
    }
}

async function resetPassword(req, res, next) {
    try {
        const { password } = req.body;
        const user = await passwordService.resetPassword(req.params.token, password);

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré' });
        }

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        // console.error('Erreur:', error);
        next(error);
    }
}

export default {
    forgotPassword,
    verifyResetToken,
    resetPassword,
}