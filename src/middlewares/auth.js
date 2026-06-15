import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'Token no proporcionado'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            'claveSecreta2026'
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            auth: false,
            message: 'Token inválido'
        });

    }

};