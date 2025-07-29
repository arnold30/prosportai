// importarDatos.js
import pool from './db.js';
import axios from 'axios';

// Insertar país
async function insertarPais(nombre, codigo, codigo_iso = null) {
  const { rows } = await pool.query(
    `INSERT INTO pais (nombre, codigo, codigo_iso)
     VALUES ($1, $2, $3)
     ON CONFLICT (codigo) DO UPDATE SET nombre=EXCLUDED.nombre RETURNING id`,
    [nombre, codigo, codigo_iso]
  );
  return rows[0].id;
}

// Insertar liga
async function insertarLiga(nombre, pais_id) {
  const { rows } = await pool.query(
    `INSERT INTO liga (nombre, pais_id) VALUES ($1, $2) RETURNING id`,
    [nombre, pais_id]
  );
  return rows[0].id;
}

// Insertar club
async function insertarClub(nombre, liga_id) {
  const { rows } = await pool.query(
    `INSERT INTO club (nombre, liga_id) VALUES ($1, $2) RETURNING id`,
    [nombre, liga_id]
  );
  return rows[0].id;
}

// Insertar jugador
async function insertarJugador(nombre, club_id, posicion, foto_url = null) {
  await pool.query(
    `INSERT INTO jugador (nombre, club_id, posicion, foto_url)
     VALUES ($1, $2, $3, $4)`,
    [nombre, club_id, posicion, foto_url]
  );
}

// Ejemplo: Importar Eliteserien (Noruega)
async function importarNoruega() {
  const pais_id = await insertarPais('Noruega', 'NOR', 'NO');
  const liga_id = await insertarLiga('Eliteserien', pais_id);

  // Obtener clubes (TheSportsDB)
  const respClubs = await axios.get('https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=Norwegian%20Eliteserien');
  const clubs = respClubs.data.teams;
  if (!clubs) throw new Error('No se encontraron clubs');

  for (const club of clubs) {
    const club_id = await insertarClub(club.strTeam, liga_id);

    // Obtener jugadores de ese club
    const respPlayers = await axios.get(`https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=${club.idTeam}`);
    const players = respPlayers.data.player;
    if (!players) continue;

    for (const p of players) {
      await insertarJugador(
        p.strPlayer,
        club_id,
        p.strPosition,
        p.strThumb // foto_url
      );
    }
    console.log(`Club y jugadores importados: ${club.strTeam}`);
  }
  console.log('Importación terminada');
}

importarNoruega().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
