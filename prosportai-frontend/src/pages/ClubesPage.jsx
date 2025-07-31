import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BarChart3, Shield, Globe, Zap, LineChart, Check } from "lucide-react";
import { Link } from "react-router-dom";

const ClubesPage = () => {
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
                Soluciones Avanzadas para <span className="text-gradient">Clubes Deportivos</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Gestiona todos tus equipos, entrenadores y atletas con una plataforma integral potenciada por inteligencia artificial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/solicitar-demo?para=clubes">
                    Solicitar Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contacto-ventas?para=clubes">Contactar con Ventas</Link>
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
                <img  alt="Dashboard de gestión de club deportivo con múltiples equipos" className="w-full h-auto" src="https://images.unsplash.com/photo-1625296276703-3fbc924f07b5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gestión Integral para Clubes</h2>
            <p className="text-xl text-muted-foreground">
              Herramientas diseñadas específicamente para las necesidades de clubes deportivos de todos los tamaños.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/gestion-multiequipo" className="block hover:no-underline">
              <Card className="feature-card border-primary/10 h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Gestión Multiequipo</CardTitle>
                  <CardDescription className="text-base">
                    Administra todos tus equipos, categorías y grupos desde un único panel centralizado.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Análisis Comparativo</CardTitle>
                <CardDescription className="text-base">
                  Compara el rendimiento entre equipos, temporadas y jugadores con análisis detallados.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Gestión de Permisos</CardTitle>
                <CardDescription className="text-base">
                  Control de acceso granular para diferentes roles: directivos, entrenadores, médicos y atletas.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Soporte Multilingüe</CardTitle>
                <CardDescription className="text-base">
                  Plataforma disponible en múltiples idiomas para clubes con personal y atletas internacionales.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Detección de Talento</CardTitle>
                <CardDescription className="text-base">
                  Algoritmos de IA que ayudan a identificar y desarrollar talento dentro del club.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="feature-card border-primary/10">
              <CardHeader>
                <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Informes Personalizados</CardTitle>
                <CardDescription className="text-base">
                  Genera informes detallados para directivos, entrenadores y patrocinadores con datos relevantes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Case Study Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Caso de Éxito: Club Atlético Madrileño</h2>
              <p className="text-lg text-muted-foreground mb-6">
                El Club Atlético Madrileño implementó TrainAI Pro en todas sus categorías, desde juveniles hasta el primer equipo, logrando:
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p><span className="font-medium">28% de mejora</span> en la coordinación entre cuerpo técnico y médico</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p><span className="font-medium">Reducción del 35%</span> en lesiones gracias a la detección temprana de fatiga</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p><span className="font-medium">Identificación de 5 talentos</span> en categorías inferiores que ahora están en el primer equipo</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p><span className="font-medium">Ahorro de 120+ horas mensuales</span> en tareas administrativas y de planificación</p>
                </li>
              </ul>
              
              <Button asChild>
                <Link to="/casos-de-exito">Ver Más Casos de Éxito</Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-primary/20">
                <img  alt="Equipo técnico del Club Atlético Madrileño utilizando TrainAI Pro" className="w-full h-auto" src="https://images.unsplash.com/photo-1553477660-719d367abac1" />
              </div>
              
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes para Clubes</h2>
            <p className="text-xl text-muted-foreground">
              Soluciones escalables que crecen con tu club, desde equipos pequeños hasta grandes organizaciones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Club Básico</CardTitle>
                <CardDescription>Para clubes pequeños con hasta 3 equipos</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">299€</span>
                  <span className="text-muted-foreground ml-2">/ mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Hasta 3 equipos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Hasta 10 entrenadores</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Hasta 100 atletas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Análisis básico de rendimiento</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Soporte por email</span>
                  </li>
                </ul>
                <Button asChild className="w-full mt-6">
                  <Link to="/contacto-ventas?plan=club_basico">Solicitar Demo</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle>Club Pro</CardTitle>
                <CardDescription>Para clubes medianos con hasta 10 equipos</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">599€</span>
                  <span className="text-muted-foreground ml-2">/ mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Hasta 10 equipos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Hasta 30 entrenadores</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Hasta 300 atletas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Análisis avanzado de rendimiento</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Detección de talento con IA</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
                <Button asChild className="w-full mt-6">
                   <Link to="/contacto-ventas?plan=club_pro">Solicitar Demo</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Club Enterprise</CardTitle>
                <CardDescription>Para grandes clubes con necesidades avanzadas</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">2499€</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Equipos ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Entrenadores ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Atletas ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Análisis predictivo avanzado</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Integración con sistemas existentes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Consultor dedicado</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link to="/contacto-ventas?plan=club_enterprise">Contactar con Ventas</Link>
                </Button>
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
              Lleva tu Club al Siguiente Nivel
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Únete a cientos de clubes deportivos que ya están utilizando TrainAI Pro para optimizar el rendimiento de sus equipos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/solicitar-demo?para=clubes">
                  Solicitar Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contacto-ventas?para=clubes">Contactar con Ventas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubesPage;