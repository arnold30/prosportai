// backend/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',          // <-- Cambia si tu usuario es otro
  host: '127.0.0.1',
  database: 'prosportai',        // <-- Cambia por tu nombre de base de datos
  password: 'te_%99Quiero',   // <-- Cambia por tu contraseña
  port: 5432,                // Puerto por defecto de PostgreSQL
});

export default pool;
