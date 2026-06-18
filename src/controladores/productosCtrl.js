import { conmysql } from '../db.js';

export const listarProductos = async (req, res) => {

    try {

        const [rows] = await conmysql.query(
            'SELECT * FROM productos'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

export const guardarProducto = async (req, res) => {

    try {

        const {
            prod_codigo,
            prod_nombre,
            prod_stock,
            prod_precio,
            prod_activo
        } = req.body;

        const prod_imagen =
            req.file
                ? '/uploads/' + req.file.filename
                : null;

        const [result] = await conmysql.query(
            `INSERT INTO productos
            (
                prod_codigo,
                prod_nombre,
                prod_stock,
                prod_precio,
                prod_activo,
                prod_imagen
            )
            VALUES (?,?,?,?,?,?)`,
            [
                prod_codigo,
                prod_nombre,
                prod_stock,
                prod_precio,
                prod_activo,
                prod_imagen
            ]
        );

        res.json({
            mensaje: 'Producto registrado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};