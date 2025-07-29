// backend/openai.js
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function obtenerRespuestaChat(prompt) {
  // SYSTEM PROMPT: IA DEPORTIVA (prohibido dar tablas/rutinas si no paga)
  const systemPrompt = `
Eres un asistente experto en fútbol, deporte y entrenamiento.
Responde solo con consejos, motivación, información general, análisis de juego y buenas prácticas.
NO entregues rutinas completas, programas ni tablas de entrenamiento. Si el usuario pide una tabla, rutina detallada o entrenamiento personalizado, responde: "Para recibir rutinas o tablas personalizadas, debes tener una suscripción activa en la plataforma ProsportAI."
Puedes dar ideas, sugerencias, explicaciones, tips, pero nunca estructures una tabla o programa completo. Sé siempre profesional, motivador y claro.
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: String(prompt) }
      ],
      temperature: 0.65,
      max_tokens: 700,
    });
    return response.choices?.[0]?.message?.content?.trim() || "No se pudo generar respuesta.";
  } catch (error) {
    console.error("Error al obtener respuesta de OpenAI:", error);
    return "Ocurrió un error al generar la respuesta.";
  }
}
