import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, PlayCircle, Users, Calendar, BarChart3, Brain, MessageSquare, Zap } from "lucide-react";

const DemoEntrenadoresPage = () => {
  // CAMBIA ESTE ID por el ID de tu video de YouTube
  const videoId = "TU_ID_DE_VIDEO_AQUI"; // Ejemplo: "AbCdEfGhIjK"

  return (
    <div className="bg-background text-foreground">
      {/* Header Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-b">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div>
              <Button variant="outline" asChild className="mb-4 md:mb-0">
                <Link to="/entrenadores">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Entrenadores
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                Demo Exclusiva para Entrenadores ProSportAi
              </h1>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
                Descubre en este video cómo ProSportAi puede transformar tu metodología de entrenamiento y potenciar los resultados de tus atletas.
              </p>
            </div>
            <Button size="lg" asChild className="mt-4 md:mt-0">
              <Link to="/registro?rol=entrenador">
                Comenzar Prueba Gratuita
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden shadow-2xl border-primary/20">
              <CardHeader className="p-0">
                <div className="aspect-video bg-black relative">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title="Video Demo ProSportAi para Entrenadores"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <PlayCircle className="w-20 h-20 text-white/70 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-2">Transforma tu Coaching con IA</CardTitle>
                <p className="text-muted-foreground">
                  Este video de 5 minutos te guiará a través de las características clave de ProSportAi diseñadas para entrenadores como tú. Aprende a optimizar la planificación, analizar el rendimiento y comunicarte eficazmente con tus atletas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beneficios Clave para Entrenadores</h2>
            <p className="text-xl text-muted-foreground">
              Descubre por qué ProSportAi es la herramienta preferida por entrenadores de alto rendimiento.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Gestión Eficiente de Atletas", description: "Centraliza toda la información de tus atletas, desde perfiles hasta progreso y comunicación." },
              { icon: Calendar, title: "Planificación Inteligente y Adaptable", description: "Crea planes de entrenamiento personalizados con IA que se ajustan dinámicamente." },
              { icon: BarChart3, title: "Análisis Profundo del Rendimiento", description: "Visualiza datos clave, identifica tendencias y toma decisiones informadas para mejorar." },
              { icon: Brain, title: "Recomendaciones Basadas en IA", description: "Recibe insights y sugerencias para optimizar cargas, prevenir lesiones y maximizar el potencial." },
              { icon: MessageSquare, title: "Comunicación Fluida", description: "Interactúa con tus atletas, comparte feedback y mantén a todos alineados y motivados." },
              { icon: Zap, title: "Ahorro de Tiempo Significativo", description: "Automatiza tareas repetitivas y enfócate en lo que realmente importa: entrenar." },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border">
                  <CardHeader>
                    <div className="flex items-center mb-3">
                      <div className="p-3 rounded-full bg-primary/10 mr-4">
                        <benefit.icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /><span>Optimización de procesos</span></li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /><span>Mejora de resultados</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Revolucionar tu Entrenamiento?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Da el siguiente paso y únete a la comunidad de entrenadores que están marcando la diferencia con ProSportAi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/registro?rol=entrenador">
                  Comenzar Prueba Gratuita
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/contacto-ventas?para=entrenadores">
                  Hablar con un Experto
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoEntrenadoresPage;