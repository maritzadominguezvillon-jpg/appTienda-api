import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import clientesRoutes from './routes/clientes.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', clientesRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'Servidor funcionando correctamente'
    });
});

export default app;