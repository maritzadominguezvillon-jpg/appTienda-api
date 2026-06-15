import { conmysql } from '../db.js';

// LISTAR CLIENTES
export const listarClientes = async (req, res) => {

    try {

        const [rows] = await conmysql.query(
            'SELECT * FROM clientes'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// OBTENER UN CLIENTE
export const obtenerCliente = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await conmysql.query(
            'SELECT * FROM clientes WHERE cli_id = ?',
            [id]
        );

        if (rows.length <= 0) {

            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });

        }

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// GUARDAR CLIENTE
export const guardarCliente = async (req, res) => {

    try {

        const {
            identificacion,
            nombre,
            telefono,
            correo,
            direccion,
            pais,
            ciudad
        } = req.body;

        const [result] = await conmysql.query(
            `INSERT INTO clientes
            (
                cli_identificacion,
                cli_nombre,
                cli_telefono,
                cli_correo,
                cli_direccion,
                cli_pais,
                cli_ciudad
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                identificacion,
                nombre,
                telefono,
                correo,
                direccion,
                pais,
                ciudad
            ]
        );

        res.json({
            mensaje: 'Cliente registrado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// ACTUALIZAR CLIENTE
export const actualizarCliente = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            identificacion,
            nombre,
            telefono,
            correo,
            direccion,
            pais,
            ciudad
        } = req.body;

        await conmysql.query(
            `UPDATE clientes SET
            cli_identificacion=?,
            cli_nombre=?,
            cli_telefono=?,
            cli_correo=?,
            cli_direccion=?,
            cli_pais=?,
            cli_ciudad=?
            WHERE cli_id=?`,
            [
                identificacion,
                nombre,
                telefono,
                correo,
                direccion,
                pais,
                ciudad,
                id
            ]
        );

        res.json({
            mensaje: 'Cliente actualizado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// ELIMINAR CLIENTE
export const eliminarCliente = async (req, res) => {

    try {

        const { id } = req.params;

        await conmysql.query(
            'DELETE FROM clientes WHERE cli_id=?',
            [id]
        );

        res.json({
            mensaje: 'Cliente eliminado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};