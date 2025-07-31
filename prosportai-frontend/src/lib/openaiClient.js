export async function generarRespuestaIA(prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // o process.env.OPENAI_API_KEY si es backend
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Eres ProSportAi Assistant, un experto en optimización del rendimiento deportivo, estrategias de entrenamiento, análisis de datos y uso de la plataforma ProSportAi.

Tu objetivo es ayudar al usuario con explicaciones claras y consejos prácticos sobre temas deportivos o sobre cómo usar ProSportAi.

❌ Nunca generes rutinas, tablas, listas de ejercicios ni estructuras por día.
✅ Solo proporciona explicaciones breves, profesionales y sin inventar si no sabes algo.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6,
    }),
  });
const prompt = `NO me des tablas ni rutinas. Solo explica: ${userMessage}`;

  if (!res.ok) {
    throw new Error("Error al generar la respuesta de IA");
  }

  const data = await res.json();
  return data.choices[0]?.message?.content || "No se pudo generar respuesta.";
}
