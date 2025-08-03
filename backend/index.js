// backend/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Tus routers personalizados (mantén solo los que uses)
import footballLocalRoutes from "./routes/footballLocal.js";
import footballDataRoutes from "./routes/footballData.js";
import thesportsdbRoutes from "./routes/thesportsdb.js";

import { obtenerRespuestaChat } from "./openai.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routers de fútbol (ignora los que no uses)
app.use("/api/local-football", footballLocalRoutes);
app.use("/api/football-data", footballDataRoutes);
app.use("/api/thesportsdb", thesportsdbRoutes);

// =========================
//   *** ASISTENTE IA ***
// =========================

app.post("/api/openai", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "El campo 'prompt' es requerido." });
    }
    const respuesta = await obtenerRespuestaChat(prompt);
    res.json({ message: respuesta });
  } catch (error) {
    console.error("Error en /api/openai:", error);
    res.status(500).json({ error: "No se pudo generar la respuesta de IA" });
  }
});

// =========================
//   GENERADOR DE PLANTILLA IA
// =========================
app.post("/api/generar-plantilla", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "El campo 'prompt' es requerido." });
    }
    const respuesta = await obtenerRespuestaChat(prompt);

    const plantilla = {
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Plantilla IA - ${prompt.substring(0, 30)}`,
      description: respuesta,
      targetObjective: prompt,
      level: "Intermedio",
      durationDays: "7",
      daysPerWeek: "3",
      structure: [],
      isCommunity: false,
      // user_id viene del frontend/Supabase
    };

    res.json(plantilla);
  } catch (error) {
    console.error("Error en /api/generar-plantilla:", error);
    res.status(500).json({ error: "No se pudo generar la plantilla IA" });
  }
});

// =========================
//  Endpoint test básico
// =========================
app.get("/", (req, res) => {
  res.send("ProSportAI backend está corriendo 👋");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log("🚀 Backend escuchando en http://0.0.0.0:" + PORT)
);
