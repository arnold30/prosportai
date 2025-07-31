import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Activity, Users, BarChart, TrendingUp, Globe } from "lucide-react";
import { useTranslation, Trans } from 'react-i18next';

// CSS de animación para el gradiente
const gradientStyle = {
  background: "linear-gradient(90deg, #2563eb 0%, #a21caf 45%, #f59e42 100%)",
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradient-move 4s ease-in-out infinite"
};

// Puedes poner este keyframes en tu CSS global:
/*
@keyframes gradient-move {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}
*/

const featuresTooltip = [
  "Genera planes personalizados con IA.",
  "Analiza el rendimiento con datos reales.",
  "Gestiona equipos fácilmente.",
  "Informes detallados de progreso.",
  "Optimización continua con IA.",
  "Alcance global para clubes y atletas."
];

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 md:py-32 hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Maximiza el Potencial Deportivo con{" "}
              <span style={gradientStyle} className="font-extrabold transition-colors hover:drop-shadow-[0_0_20px_rgba(37,99,235,0.6)] cursor-pointer">
                Inteligencia Artificial
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Plataforma de alto rendimiento para clubes, entrenadores y atletas. Transforma el futuro de tu equipo con IA avanzada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-100 text-lg py-6"
              >
                <Link to="/registro">
                  {t('hero.cta_main') || "Comienza Gratis"} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/solicitar-demo">{t('hero.cta_secondary') || "Solicitar demo"}</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              {[
                { icon: <Brain className="h-6 w-6 text-primary flex-shrink-0" />, label: "Planes con IA", tooltip: featuresTooltip[0] },
                { icon: <Activity className="h-6 w-6 text-primary flex-shrink-0" />, label: "Análisis Predictivo", tooltip: featuresTooltip[1] },
                { icon: <Users className="h-6 w-6 text-primary flex-shrink-0" />, label: "Gestión de Equipos", tooltip: featuresTooltip[2] },
                { icon: <BarChart className="h-6 w-6 text-primary flex-shrink-0" />, label: "Informes Detallados", tooltip: featuresTooltip[3] },
                { icon: <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />, label: "Optimización Continua", tooltip: featuresTooltip[4] },
                { icon: <Globe className="h-6 w-6 text-primary flex-shrink-0" />, label: "Alcance Global", tooltip: featuresTooltip[5] },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-primary/10 shadow-sm cursor-help transition-transform hover:-translate-y-1 hover:shadow-primary/20 group"
                  title={f.tooltip}
                >
                  {f.icon}
                  <span className="font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-background">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
              <img
                alt="Dashboard de ProSportAi mostrando análisis de rendimiento de un atleta y planificación de entrenamiento con IA"
                className="w-full h-auto"
                src="https://images.unsplash.com/photo-1609096458733-95b38583ac4e"
                draggable={false}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-xl transform transition-all hover:scale-105"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="font-bold text-lg">+18% Rendimiento</p>
                <p className="text-xs">con IA avanzada</p>
              </motion.div>

              <motion.div
                className="absolute top-4 -left-6 bg-white p-3 rounded-lg shadow-xl transform transition-all hover:scale-105"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-sm font-medium">Optimización en tiempo real</p>
                </div>
              </motion.div>
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
