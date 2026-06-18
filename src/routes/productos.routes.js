import { Router } from 'express';

import {
    listarProductos,
    guardarProducto
}
from '../controladores/productosCtrl.js';

import upload from '../middlewares/upload.js';

const router = Router();

router.get(
    '/productos',
    listarProductos
);

router.post(
    '/productos',
    upload.single('imagen'),
    guardarProducto
);

export default router;