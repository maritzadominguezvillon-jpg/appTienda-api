import { Router } from 'express';
import { login } from '../controladores/authCtrl.js';
import { verificarToken } from '../middlewares/auth.js';

const router = Router();

router.post('/login', login);

router.get('/prueba', verificarToken, (req, res) => {

    res.json({
        auth: true,
        message: 'Acceso permitido',
        usuario: req.usuario
    });

});

export default router;