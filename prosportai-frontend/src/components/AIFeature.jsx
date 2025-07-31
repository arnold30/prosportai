import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

const AIFeature = () => {
  return (
    <section className="container py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12">
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
          <BrainCircuit className="h-9 w-9 text-primary" /> IA aplicada al deporte
        </h3>
        <p className="text-lg text-muted-foreground mb-6 max-w-xl">
          Nuestra inteligencia artificial analiza datos en tiempo real, identifica patrones de rendimiento, y te da recomendaciones precisas para mejorar cada aspecto de tu equipo. 
          <span className="ml-1 text-primary font-medium">Todo de forma automática.</span>
        </p>
        <ul className="space-y-3 text-base">
          <li>✔️ Generación de análisis instantáneo para cada jugador</li>
          <li>✔️ Recomendaciones de mejora en base a tu club</li>
          <li>✔️ Análisis comparativo con rivales y competidores</li>
          <li>✔️ Alertas de sobrecarga y prevención de lesiones</li>
        </ul>
      </motion.div>
      <motion.div
        className="flex-1 flex justify-center items-center"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b"
          alt="IA Deportiva ProSportAI"
          className="w-[370px] h-auto rounded-xl shadow-xl border border-primary/20"
          draggable={false}
        />
      </motion.div>
    </section>
  );
};

export default AIFeature;
