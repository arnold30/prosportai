import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AnalisisJugadoresIA() {
  const { currentUser, loading } = useAuth();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [league, setLeague] = useState("");
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState("");
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState("");

  // 1. Cargar países
  useEffect(() => {
    fetch("/api/local-football/countries")
      .then(res => res.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  // 2. Al elegir país, cargar ligas
  useEffect(() => {
    setLeague(""); setLeagues([]);
    setClub(""); setClubs([]);
    setPlayer(""); setPlayers([]);
    if (country) {
      fetch(`/api/local-football/leagues/${country}`)
        .then(res => res.json())
        .then(setLeagues)
        .catch(console.error);
    }
  }, [country]);

  // 3. Al elegir liga, cargar clubes
  useEffect(() => {
    setClub(""); setClubs([]);
    setPlayer(""); setPlayers([]);
    if (league) {
      fetch(`/api/local-football/clubs/${league}`)
        .then(res => res.json())
        .then(setClubs)
        .catch(console.error);
    }
  }, [league]);

  // 4. Al elegir club, cargar jugadores
  useEffect(() => {
    setPlayer(""); setPlayers([]);
    if (club) {
      fetch(`/api/local-football/players/${club}`)
        .then(res => res.json())
        .then(setPlayers)
        .catch(console.error);
    }
  }, [club]);

  if (loading) return null;
  if (!currentUser || (currentUser.rol !== "entrenador" && currentUser.rol !== "club")) {
    return <Navigate to="/" />;
  }

  // UI
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">ANÁLISIS DE JUGADORES CON IA</h1>
      <div className="flex gap-4 mb-8 flex-wrap">
        {/* País */}
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">País</option>
          {countries.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        {/* Liga */}
        <select
          value={league}
          onChange={e => setLeague(e.target.value)}
          disabled={!country}
          className="p-2 border rounded"
        >
          <option value="">Liga</option>
          {leagues.map(l => (
            <option key={l.id} value={l.id}>{l.nombre}</option>
          ))}
        </select>
        {/* Club */}
        <select
          value={club}
          onChange={e => setClub(e.target.value)}
          disabled={!league}
          className="p-2 border rounded"
        >
          <option value="">Club</option>
          {clubs.map(club => (
            <option key={club.id} value={club.id}>{club.nombre}</option>
          ))}
        </select>
        {/* Jugador */}
        <select
          value={player}
          onChange={e => setPlayer(e.target.value)}
          disabled={!club}
          className="p-2 border rounded"
        >
          <option value="">Jugador</option>
          {players.map(j => (
            <option key={j.id} value={j.id}>{j.nombre}</option>
          ))}
        </select>
      </div>

      {/* Detalle del jugador */}
      {player && (
        <div className="border rounded p-4 bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">
            Detalles del jugador: {players.find(p => String(p.id) === String(player))?.nombre}
          </h2>
          <div>
            <b>Posición:</b> {players.find(p => String(p.id) === String(player))?.posicion || "-"}
          </div>
          {players.find(p => String(p.id) === String(player))?.foto_url && (
            <img
              src={players.find(p => String(p.id) === String(player))?.foto_url}
              alt="Foto jugador"
              style={{ width: 120, marginTop: 12, borderRadius: 8 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
