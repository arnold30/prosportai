// backend/routes/footballData.js
import express from "express";
import axios from "axios";

const router = express.Router();
const API_TOKEN = process.env.FOOTBALLDATA_TOKEN;

// SOLO estas ligas están permitidas en tu key gratuita
const ALLOWED_CODES = [
  "WC", "CL", "BL1", "DED", "BSA", "PD", "FL1", "ELC", "PPL", "EC", "SA", "PL"
];

// 1. Listar países que tienen al menos una liga permitida
router.get('/leagues/countries', async (req, res) => {
  try {
    const resp = await axios.get('https://api.football-data.org/v4/competitions', {
      headers: { "X-Auth-Token": API_TOKEN }
    });

    const codes = new Set();
    const countries = [];
    for (const comp of resp.data.competitions) {
      if (
        comp.type === "LEAGUE" &&
        comp.area &&
        comp.area.code &&
        !codes.has(comp.area.code) &&
        ALLOWED_CODES.includes(comp.code)
      ) {
        codes.add(comp.area.code);
        countries.push({
          code: comp.area.code,
          name: comp.area.name,
          flag: comp.area.flag || null,
        });
      }
    }
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// 2. Ligas permitidas por país
router.get('/leagues/:country', async (req, res) => {
  const { country } = req.params;
  try {
    const resp = await axios.get('https://api.football-data.org/v4/competitions', {
      headers: { "X-Auth-Token": API_TOKEN }
    });
    const leagues = resp.data.competitions.filter(
      l =>
        l.area.code === country &&
        l.type === "LEAGUE" &&
        ALLOWED_CODES.includes(l.code)
    );
    res.json(leagues);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// 3. Clubes de una liga permitida
router.get('/clubs/:league', async (req, res) => {
  const { league } = req.params;
  try {
    const resp = await axios.get(
      `https://api.football-data.org/v4/competitions/${league}/teams`,
      { headers: { "X-Auth-Token": API_TOKEN } }
    );
    res.json(resp.data.teams || []);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// 4. Jugadores por club
router.get('/players/:clubId', async (req, res) => {
  const { clubId } = req.params;
  try {
    const resp = await axios.get(
      `https://api.football-data.org/v4/teams/${clubId}`,
      { headers: { "X-Auth-Token": API_TOKEN } }
    );
    res.json(resp.data.squad || []);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

export default router;
