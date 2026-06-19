import { Router } from 'express';

import {
    listarProductos,
    obtenerProducto,
    guardarProducto,
    actualizarProducto,
    eliminarProducto
}
from '../controladores/productosCtrl.js';

import upload from '../middlewares/upload.js';

const router = Router();

router.get(
    '/productos',
    listarProductos
);

router.get(
    '/productos/:id',
    obtenerProducto
);

router.post(
    '/productos',
    upload.single('imagen'),
    guardarProducto
);

router.put(
    '/productos/:id',
    upload.single('imagen'),
    actualizarProducto
);

router.delete(
    '/productos/:id',
    eliminarProducto
);

export default router;