import app from './app.js';
import { PORT } from './config.js';
import { conmysql } from './db.js';

app.listen(PORT);

console.log("Servidor ejecutándose en puerto", PORT);

async function probarConexion() {
    try {
        const conexion = await conmysql.getConnection();
        console.log("Base de datos conectada correctamente");
        conexion.release();
    } catch (error) {
        console.log("Error al conectar la BD");
        console.log(error);
    }
}

probarConexion();