// backend/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Si tienes estos routers, déjalos, si no, ignóralos:
import footballLocalRoutes from "./routes/footballLocal.js";
import footballDataRoutes from "./routes/footballData.js";
import thesportsdbRoutes from "./routes/thesportsdb.js";

import { obtenerRespuestaChat } from "./openai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/local-football", footballLocalRoutes);
app.use("/api/football-data", footballDataRoutes);
app.use("/api/thesportsdb", thesportsdbRoutes);

// Endpoint para el generador de plantillas con IA (¡ESTO FALTABA!)
app.post("/api/generar-plantilla", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "El campo 'prompt' es requerido." });
    }
    // Aquí llamas a OpenAI, puedes cambiar la lógica según tus necesidades
    const respuesta = await obtenerRespuestaChat(prompt);

    // IMPORTANTE: formatea la respuesta para que sea una plantilla válida para tu frontend/Supabase
    // Aquí te doy un ejemplo simple, pero deberías adaptar según el esquema de tu tabla "plantillas"
    const plantilla = {
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Plantilla IA - ${prompt.substring(0, 30)}`,
      description: respuesta, // o lo que te devuelva OpenAI
      targetObjective: prompt,
      level: "Intermedio",
      durationDays: "7",
      daysPerWeek: "3",
      structure: [],
      isCommunity: false,
      // El user_id se pone en el frontend antes de guardar en Supabase
    };

    res.json(plantilla);
  } catch (error) {
    console.error("Error en /api/generar-plantilla:", error);
    res.status(500).json({ error: "No se pudo generar la plantilla IA" });
  }
});

// Endpoint test básico
app.get("/", (req, res) => {
  res.send("ProSportAI backend está corriendo 👋");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log("🚀 Backend escuchando en http://localhost:" + PORT)
);
