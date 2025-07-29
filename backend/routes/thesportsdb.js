import express from "express";
import axios from "axios";

const router = express.Router();
const BASE = "https://www.thesportsdb.com/api/v1/json/123"; // Puedes cambiar '123' por tu clave premium luego

// 1. Todas las ligas de fútbol (Soccer)
router.get('/leagues', async (req, res) => {
  try {
    const resp = await axios.get(`${BASE}/all_leagues.php`);
    // Solo soccer (algunos pueden no tener equipos)
    const soccerLeagues = resp.data.leagues.filter(l => l.strSport === "Soccer");
    res.json(soccerLeagues);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// 2. Equipos por liga (ID de liga, ej: 4328 para EPL)
router.get('/teams/:leagueId', async (req, res) => {
  const { leagueId } = req.params;
  try {
    const resp = await axios.get(`${BASE}/lookup_all_teams.php?id=${leagueId}`);
    res.json(resp.data.teams || []);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// 3. Jugadores por equipo (ID de equipo)
router.get('/players/:teamId', async (req, res) => {
  const { teamId } = req.params;
  try {
    const resp = await axios.get(`${BASE}/lookup_all_players.php?id=${teamId}`);
    res.json(resp.data.player || []);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

export default router;
