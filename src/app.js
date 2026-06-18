import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(
    '/uploads',
    express.static(
        path.join(__dirname, 'uploads')
    )
);

app.use('/api', authRoutes);
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);

app.get('/', (req, res) => {

    res.json({
        mensaje: 'Servidor funcionando correctamente'
    });

});

export default app;