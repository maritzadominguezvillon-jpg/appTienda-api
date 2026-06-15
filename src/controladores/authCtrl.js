import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {

    try {

        const { usuario, clave } = req.body;

        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios WHERE usr_usuario = ?',
            [usuario]
        );

        if (rows.length <= 0) {
            return res.status(404).json({
                auth: false,
                message: 'Usuario no encontrado'
            });
        }

        const user = rows[0];

        const coincide = await bcrypt.compare(
            clave,
            user.usr_clave
        );

        if (!coincide) {
            return res.status(401).json({
                auth: false,
                message: 'Clave incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: user.usr_id,
                usuario: user.usr_usuario
            },
            'claveSecreta2026',
            {
                expiresIn: '1h'
            }
        );

       res.json({
    auth: true,
    token: token,
    id: user.usr_id,
    usuario: user.usr_usuario
});

    } catch (error) {

        return res.status(500).json({
            message: 'Error en el servidor'
        });

    }

};