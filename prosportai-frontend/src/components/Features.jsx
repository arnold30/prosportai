import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart, ActivitySquare, Users, Zap, Globe } from "lucide-react";

const featuresList = [
  {
    icon: <ShieldCheck className="h-7 w-7 text-primary" />,
    title: "Seguridad Total",
    desc: "Protege tus datos y los de tu equipo con tecnología de nivel empresarial.",
    tooltip: "Tus datos están siempre cifrados y seguros."
  },
  {
    icon: <BarChart className="h-7 w-7 text-primary" />,
    title: "Estadísticas Detalladas",
    desc: "Obtén reportes en tiempo real sobre el rendimiento y progreso.",
    tooltip: "Paneles de análisis avanzados."
  },
  {
    icon: <ActivitySquare className="h-7 w-7 text-primary" />,
    title: "Análisis Predictivo",
    desc: "Anticipa riesgos y oportunidades con IA aplicada al deporte.",
    tooltip: "Predicciones y alertas inteligentes."
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    title: "Gestión de Equipos",
    desc: "Organiza, comunica y mejora la colaboración de tu club.",
    tooltip: "Herramientas de gestión adaptadas a tu equipo."
  },
  {
    icon: <Zap className="h-7 w-7 text-primary" />,
    title: "Automatización",
    desc: "Automatiza tareas y optimiza el tiempo de entrenadores y atletas.",
    tooltip: "Procesos eficientes, más tiempo para entrenar."
  },
  {
    icon: <Globe className="h-7 w-7 text-primary" />,
    title: "Alcance Global",
    desc: "Disponible para clubes y deportistas de todo el mundo.",
    tooltip: "Accede desde cualquier lugar y dispositivo."
  },
];

const Features = () => {
  return (
    <section className="container py-12 md:py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Todo lo que tu club necesita
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresList.map((f, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl border bg-white/70 shadow hover:shadow-primary/30 transition-all group cursor-pointer relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 40px 0 #2563eb22" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            title={f.tooltip}
          >
            <div className="flex items-center gap-3 mb-3">
              {f.icon}
              <span className="font-semibold text-lg">{f.title}</span>
            </div>
            <p className="text-muted-foreground text-base">{f.desc}</p>
            {/* Tooltip visual al hover */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-background border border-primary/20 rounded-lg px-3 py-1 text-xs text-primary z-10 shadow-lg">
              {f.tooltip}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
