import { conmysql } from '../db.js';

// LISTAR PRODUCTOS
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

// OBTENER UN PRODUCTO
export const obtenerProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await conmysql.query(
            'SELECT * FROM productos WHERE prod_id=?',
            [id]
        );

        if (rows.length <= 0) {

            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });

        }

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// GUARDAR PRODUCTO
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

// ACTUALIZAR PRODUCTO
export const actualizarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            prod_codigo,
            prod_nombre,
            prod_stock,
            prod_precio,
            prod_activo
        } = req.body;

        let prod_imagen = null;

        if (req.file) {

            prod_imagen =
                '/uploads/' + req.file.filename;

        } else {

            const [rows] =
                await conmysql.query(
                    'SELECT prod_imagen FROM productos WHERE prod_id=?',
                    [id]
                );

            if (rows.length > 0) {

                prod_imagen =
                    rows[0].prod_imagen;

            }

        }

        await conmysql.query(
            `UPDATE productos SET
            prod_codigo=?,
            prod_nombre=?,
            prod_stock=?,
            prod_precio=?,
            prod_activo=?,
            prod_imagen=?
            WHERE prod_id=?`,
            [
                prod_codigo,
                prod_nombre,
                prod_stock,
                prod_precio,
                prod_activo,
                prod_imagen,
                id
            ]
        );

        res.json({
            mensaje: 'Producto actualizado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// ELIMINAR PRODUCTO
export const eliminarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        await conmysql.query(
            'DELETE FROM productos WHERE prod_id=?',
            [id]
        );

        res.json({
            mensaje: 'Producto eliminado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};