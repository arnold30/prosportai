import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, BarChart3, MessageSquare, Brain, Zap } from "lucide-react";

const EntrenadoresPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative overflow-hidden hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Potencia tu Carrera como <span className="text-gradient">Entrenador</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Herramientas avanzadas de IA diseñadas específicamente para entrenadores que buscan llevar sus métodos al siguiente nivel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/registro?rol=entrenador">
                    Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo-entrenadores">Ver Demo para Entrenadores</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-background">
                <img  alt="Entrenador utilizando la plataforma TrainAI Pro" className="w-full h-auto" src="https://images.unsplash.com/photo-1609096458733-95b38583ac4e" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Herramientas Diseñadas para Entrenadores</h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas para optimizar el rendimiento de tus atletas en una sola plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Gestión de Atletas</CardTitle>
                <CardDescription className="text-base">
                  Administra todos tus atletas desde un único panel, con perfiles detallados y seguimiento personalizado.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Planificación Inteligente</CardTitle>
                <CardDescription className="text-base">
                  Crea planes de entrenamiento personalizados con ayuda de IA, adaptados a las necesidades específicas de cada atleta.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Análisis de Rendimiento</CardTitle>
                <CardDescription className="text-base">
                  Visualiza y analiza el progreso de tus atletas con gráficos detallados y métricas personalizables.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Comunicación Directa</CardTitle>
                <CardDescription className="text-base">
                  Mantén contacto constante con tus atletas, comparte planes y recibe feedback en tiempo real.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Recomendaciones de IA</CardTitle>
                <CardDescription className="text-base">
                  Recibe sugerencias inteligentes para optimizar los entrenamientos basadas en el análisis de datos.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Automatización de Tareas</CardTitle>
                <CardDescription className="text-base">
                  Ahorra tiempo con la automatización de tareas rutinarias como seguimiento, informes y ajustes de planes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo Que Dicen Otros Entrenadores</h2>
            <p className="text-xl text-muted-foreground">
              Descubre cómo TrainAI Pro está transformando la forma en que los entrenadores trabajan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background border-primary/10">
              <CardContent className="p-6">
                <div className="mb-4">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/40">
                    <path d="M13.4 36C9.4 36 6.2 34.6667 3.8 32C1.4 29.2 0.2 25.8667 0.2 22C0.2 18.4 1.13333 15.0667 3 12C4.86667 8.93333 7.4 6.4 10.6 4.4C13.8 2.4 17.4667 1.06667 21.6 0.4L23.8 5.2C20.2 6.13333 17.2667 7.33333 15 8.8C12.7333 10.2667 11.2667 12 10.6 14C10.0667 15.8667 10.2 17.2 11 18C11.8 18.8 12.8667 19.2 14.2 19.2C16.6 19.2 18.6 20 20.2 21.6C21.8 23.2 22.6 25.2 22.6 27.6C22.6 30.1333 21.8 32.2 20.2 33.8C18.6 35.2667 16.2667 36 13.4 36ZM35.8 36C31.8 36 28.6 34.6667 26.2 32C23.8 29.2 22.6 25.8667 22.6 22C22.6 18.4 23.5333 15.0667 25.4 12C27.2667 8.93333 29.8 6.4 33 4.4C36.2 2.4 39.8667 1.06667 44 0.4L46.2 5.2C42.6 6.13333 39.6667 7.33333 37.4 8.8C35.1333 10.2667 33.6667 12 33 14C32.4667 15.8667 32.6 17.2 33.4 18C34.2 18.8 35.2667 19.2 36.6 19.2C39 19.2 41 20 42.6 21.6C44.2 23.2 45 25.2 45 27.6C45 30.1333 44.2 32.2 42.6 33.8C41 35.2667 38.6667 36 35.8 36Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-lg mb-6">TrainAI Pro ha revolucionado la forma en que diseño los planes de entrenamiento para mis atletas. La IA me proporciona insights que antes me llevaban semanas descubrir.</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">CR</div>
                  <div>
                    <p className="font-medium">Carlos Rodríguez</p>
                    <p className="text-sm text-muted-foreground">Entrenador de Atletismo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-primary/10">
              <CardContent className="p-6">
                <div className="mb-4">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/40">
                    <path d="M13.4 36C9.4 36 6.2 34.6667 3.8 32C1.4 29.2 0.2 25.8667 0.2 22C0.2 18.4 1.13333 15.0667 3 12C4.86667 8.93333 7.4 6.4 10.6 4.4C13.8 2.4 17.4667 1.06667 21.6 0.4L23.8 5.2C20.2 6.13333 17.2667 7.33333 15 8.8C12.7333 10.2667 11.2667 12 10.6 14C10.0667 15.8667 10.2 17.2 11 18C11.8 18.8 12.8667 19.2 14.2 19.2C16.6 19.2 18.6 20 20.2 21.6C21.8 23.2 22.6 25.2 22.6 27.6C22.6 30.1333 21.8 32.2 20.2 33.8C18.6 35.2667 16.2667 36 13.4 36ZM35.8 36C31.8 36 28.6 34.6667 26.2 32C23.8 29.2 22.6 25.8667 22.6 22C22.6 18.4 23.5333 15.0667 25.4 12C27.2667 8.93333 29.8 6.4 33 4.4C36.2 2.4 39.8667 1.06667 44 0.4L46.2 5.2C42.6 6.13333 39.6667 7.33333 37.4 8.8C35.1333 10.2667 33.6667 12 33 14C32.4667 15.8667 32.6 17.2 33.4 18C34.2 18.8 35.2667 19.2 36.6 19.2C39 19.2 41 20 42.6 21.6C44.2 23.2 45 25.2 45 27.6C45 30.1333 44.2 32.2 42.6 33.8C41 35.2667 38.6667 36 35.8 36Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-lg mb-6">Puedo gestionar a todos mis atletas desde una sola plataforma y recibir alertas cuando algo no va según lo planeado. Ha mejorado enormemente mi eficiencia.</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">MG</div>
                  <div>
                    <p className="font-medium">María González</p>
                    <p className="text-sm text-muted-foreground">Entrenadora de Natación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-primary/10">
              <CardContent className="p-6">
                <div className="mb-4">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/40">
                    <path d="M13.4 36C9.4 36 6.2 34.6667 3.8 32C1.4 29.2 0.2 25.8667 0.2 22C0.2 18.4 1.13333 15.0667 3 12C4.86667 8.93333 7.4 6.4 10.6 4.4C13.8 2.4 17.4667 1.06667 21.6 0.4L23.8 5.2C20.2 6.13333 17.2667 7.33333 15 8.8C12.7333 10.2667 11.2667 12 10.6 14C10.0667 15.8667 10.2 17.2 11 18C11.8 18.8 12.8667 19.2 14.2 19.2C16.6 19.2 18.6 20 20.2 21.6C21.8 23.2 22.6 25.2 22.6 27.6C22.6 30.1333 21.8 32.2 20.2 33.8C18.6 35.2667 16.2667 36 13.4 36ZM35.8 36C31.8 36 28.6 34.6667 26.2 32C23.8 29.2 22.6 25.8667 22.6 22C22.6 18.4 23.5333 15.0667 25.4 12C27.2667 8.93333 29.8 6.4 33 4.4C36.2 2.4 39.8667 1.06667 44 0.4L46.2 5.2C42.6 6.13333 39.6667 7.33333 37.4 8.8C35.1333 10.2667 33.6667 12 33 14C32.4667 15.8667 32.6 17.2 33.4 18C34.2 18.8 35.2667 19.2 36.6 19.2C39 19.2 41 20 42.6 21.6C44.2 23.2 45 25.2 45 27.6C45 30.1333 44.2 32.2 42.6 33.8C41 35.2667 38.6667 36 35.8 36Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-lg mb-6">La capacidad de ajustar los planes en tiempo real basándome en los datos que recibo ha sido un cambio radical en mi metodología de entrenamiento.</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">JM</div>
                  <div>
                    <p className="font-medium">Javier Martínez</p>
                    <p className="text-sm text-muted-foreground">Entrenador de Fútbol</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comienza a Transformar tu Enfoque de Entrenamiento
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Únete a miles de entrenadores que ya están utilizando TrainAI Pro para llevar sus métodos al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/registro?rol=entrenador">
                  Registrarse Gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contacto-ventas?para=entrenadores">Contactar con Ventas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EntrenadoresPage;