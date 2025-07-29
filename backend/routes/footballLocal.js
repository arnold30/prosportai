import express from "express";
import pool from "../db.js";
const router = express.Router();

// 1. Listar países
router.get("/countries", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, nombre, codigo FROM pais ORDER BY nombre"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Ligas por país (pásale el id)
router.get("/leagues/:paisId", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, nombre FROM liga WHERE pais_id = $1 ORDER BY nombre",
      [req.params.paisId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Clubes por liga (por id de liga)
router.get("/clubs/:ligaId", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, nombre FROM club WHERE liga_id = $1 ORDER BY nombre",
      [req.params.ligaId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Jugadores por club
router.get("/players/:clubId", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, nombre, posicion, foto_url FROM jugador WHERE club_id = $1 ORDER BY nombre",
      [req.params.clubId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
