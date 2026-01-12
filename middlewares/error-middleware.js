function errorMiddleware(err, req, res, next) {
    console.error('Erreur:', err);

    if(err.status) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        })
    }

    if(err.code && err.code.startsWith("P")) {
        return res.status(500).json({
            success: false,
            message: "Erreur de base de données"
        })
    }

    res.status(500).json({
        success: false,
        message: "Erreur serveur"
    })
}

export default errorMiddleware;
