import { Router } from 'express';

import {
    listarClientes,
    obtenerCliente,
    guardarCliente,
    actualizarCliente,
    eliminarCliente
} from '../controladores/clientesCtrl.js';

const router = Router();

router.get('/clientes', listarClientes);

router.get('/clientes/:id', obtenerCliente);

router.post('/clientes', guardarCliente);

router.put('/clientes/:id', actualizarCliente);

router.delete('/clientes/:id', eliminarCliente);

export default router;