import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Club Básico",
    price: "299",
    priceId: "price_individual_entrenador", 
    description: "Ideal para entrenadores independientes que buscan optimizar el rendimiento de un grupo reducido de atletas con IA.",
    features: [
      "Hasta 15 atletas",
      "Planes de entrenamiento con IA",
      "Análisis básico de rendimiento",
      "Comunicación directa con atletas",
      "Soporte por email y comunidad"
    ],
    popular: false,
    buttonText: "Comenzar Prueba Gratuita",
    ctaLink: "/registro?plan=club_basico"
  },
  {
    name: "Club Pro",
    price: "599",
    priceId: "price_club_pro", 
    description: "La solución perfecta para clubes y organizaciones que gestionan múltiples equipos y entrenadores, con herramientas avanzadas de IA.",
    features: [
      "Hasta 100 atletas",
      "Múltiples entrenadores (hasta 5)",
      "Planes avanzados con IA y adaptación",
      "Análisis completo de rendimiento y comparativas",
      "Gestión de equipos y categorías",
      "Predicciones de progreso y riesgo de lesión",
      "Soporte prioritario por chat y email"
    ],
    popular: true,
    buttonText: "Elegir Plan Pro",
    ctaLink: "/registro?plan=club_pro"
  },
  {
    name: "Federación / Enterprise",
    price: "2499",
    priceId: "price_enterprise_federacion", 
    description: "Solución integral y personalizada para federaciones deportivas y organizaciones de gran escala con necesidades específicas.",
    features: [
      "Atletas y entrenadores ilimitados",
      "Planes personalizados con IA a gran escala",
      "Análisis avanzado con IA y Big Data",
      "Gestión completa de múltiples clubes/equipos",
      "Integraciones API personalizadas",
      "Soporte dedicado 24/7 y consultor asignado",
      "Branding personalizado y SLAs"
    ],
    popular: false,
    buttonText: "Contactar para Demo",
    ctaLink: "/contacto-ventas?plan=enterprise" // Actualizado
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Pricing = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes Flexibles para Cada Nivel</h2>
          <p className="text-xl text-muted-foreground">
            Encuentra el plan de ProSportAi que se ajusta a tus ambiciones. Todos los planes incluyen nuestra potente IA para transformar tu enfoque de entrenamiento.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={item} className="flex">
              <Card className={`w-full flex flex-col border ${plan.popular ? 'border-primary shadow-2xl relative ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border hover:shadow-xl transition-shadow duration-300'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <Star className="h-4 w-4 mr-1.5 text-yellow-300" /> Más Popular
                  </div>
                )}
                <CardHeader className="pt-10">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base min-h-[60px]">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    {plan.price === "Custom" ? ( 
                       <span className="text-4xl font-bold">Personalizado</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">{plan.price}€</span>
                        <span className="text-muted-foreground ml-1">/ mes</span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button 
                    asChild
                    className="w-full text-lg py-6" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link to={plan.ctaLink}>{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4 text-lg">
            ¿Tienes preguntas o necesitas una solución a medida para una gran organización?
          </p>
          <Button variant="link" asChild className="text-lg text-primary hover:underline">
            <Link to="/contacto-ventas?para=expertos">Habla con nuestro equipo de expertos <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute -z-10 top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -z-10 bottom-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
    </section>
  );
};

export default Pricing;