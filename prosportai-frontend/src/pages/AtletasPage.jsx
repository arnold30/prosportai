import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, LineChart, Clock, MessageSquare, Zap, Award, Check } from "lucide-react";

const HeroSectionAtletas = () => (
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
            Maximiza tu <span className="text-gradient">Potencial Deportivo</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            Entrena más inteligentemente con planes personalizados basados en IA que se adaptan a tu progreso y necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/registro?rol=atleta">
                Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/solicitar-demo?para=atletas">Ver Demo</Link>
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
            <img  alt="Atleta revisando su plan de entrenamiento personalizado en la aplicación ProSportAi" className="w-full h-auto" src="https://images.unsplash.com/photo-1548884655-4d204ce59f91" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const FeatureCardAtletas = ({ icon: Icon, title, description }) => (
  <Card className="feature-card border-primary/10">
    <CardHeader>
      <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardHeader>
  </Card>
);

const FeaturesSectionAtletas = () => {
  const features = [
    { icon: Activity, title: "Planes Personalizados", description: "Recibe planes de entrenamiento adaptados a tus objetivos, nivel actual y disponibilidad de tiempo." },
    { icon: LineChart, title: "Seguimiento de Progreso", description: "Visualiza tu evolución con gráficos detallados y métricas personalizadas para tu deporte." },
    { icon: Clock, title: "Recordatorios Inteligentes", description: "Recibe notificaciones para tus entrenamientos, descansos y evaluaciones en el momento adecuado." },
    { icon: MessageSquare, title: "Comunicación con Entrenador", description: "Mantén contacto directo con tu entrenador, comparte resultados y recibe feedback inmediato." },
    { icon: Zap, title: "Recomendaciones de IA", description: "Obtén sugerencias personalizadas para mejorar tu técnica, nutrición y recuperación." },
    { icon: Award, title: "Objetivos y Logros", description: "Establece metas claras y celebra tus logros con un sistema de seguimiento motivacional." },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Diseñado para Atletas Ambiciosos</h2>
          <p className="text-xl text-muted-foreground">
            Herramientas que te ayudan a alcanzar tus objetivos deportivos más rápido y de forma más eficiente.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(feature => <FeatureCardAtletas key={feature.title} {...feature} />)}
        </div>
      </div>
    </section>
  );
};

const TestimonialCardAtletas = ({ quote, name, role, initials }) => (
  <Card className="bg-background border-primary/10">
    <CardContent className="p-6">
      <div className="mb-4">
        <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/40">
          <path d="M13.4 36C9.4 36 6.2 34.6667 3.8 32C1.4 29.2 0.2 25.8667 0.2 22C0.2 18.4 1.13333 15.0667 3 12C4.86667 8.93333 7.4 6.4 10.6 4.4C13.8 2.4 17.4667 1.06667 21.6 0.4L23.8 5.2C20.2 6.13333 17.2667 7.33333 15 8.8C12.7333 10.2667 11.2667 12 10.6 14C10.0667 15.8667 10.2 17.2 11 18C11.8 18.8 12.8667 19.2 14.2 19.2C16.6 19.2 18.6 20 20.2 21.6C21.8 23.2 22.6 25.2 22.6 27.6C22.6 30.1333 21.8 32.2 20.2 33.8C18.6 35.2667 16.2667 36 13.4 36ZM35.8 36C31.8 36 28.6 34.6667 26.2 32C23.8 29.2 22.6 25.8667 22.6 22C22.6 18.4 23.5333 15.0667 25.4 12C27.2667 8.93333 29.8 6.4 33 4.4C36.2 2.4 39.8667 1.06667 44 0.4L46.2 5.2C42.6 6.13333 39.6667 7.33333 37.4 8.8C35.1333 10.2667 33.6667 12 33 14C32.4667 15.8667 32.6 17.2 33.4 18C34.2 18.8 35.2667 19.2 36.6 19.2C39 19.2 41 20 42.6 21.6C44.2 23.2 45 25.2 45 27.6C45 30.1333 44.2 32.2 42.6 33.8C41 35.2667 38.6667 36 35.8 36Z" fill="currentColor"/>
        </svg>
      </div>
      <p className="text-lg mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">{initials}</div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialsSectionAtletas = () => {
  const testimonials = [
    { quote: "Puedo ver mi progreso día a día y entender exactamente qué debo mejorar. La comunicación con mi entrenador es mucho más efectiva ahora.", name: "Laura Sánchez", role: "Atleta Olímpica", initials: "LS" },
    { quote: "Las recomendaciones personalizadas me han ayudado a superar un plateau en mi rendimiento que llevaba meses intentando resolver.", name: "Miguel Torres", role: "Triatleta Profesional", initials: "MT" },
    { quote: "La aplicación me mantiene motivada con objetivos claros y feedback constante. Ha transformado completamente mi entrenamiento diario.", name: "Ana Gómez", role: "Maratonista", initials: "AG" },
  ];
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Historias de Éxito</h2>
          <p className="text-xl text-muted-foreground">
            Descubre cómo otros atletas han mejorado su rendimiento con ProSportAi.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => <TestimonialCardAtletas key={testimonial.name} {...testimonial} />)}
        </div>
      </div>
    </section>
  );
};

const ResultsSectionAtletas = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Resultados Reales, Medibles y Consistentes</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Los atletas que utilizan ProSportAi experimentan mejoras significativas en su rendimiento:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-muted/30 p-6 rounded-lg"><p className="text-3xl font-bold text-primary mb-2">+23%</p><p className="font-medium">Mejora en resistencia</p></div>
            <div className="bg-muted/30 p-6 rounded-lg"><p className="text-3xl font-bold text-primary mb-2">-18%</p><p className="font-medium">Reducción de lesiones</p></div>
            <div className="bg-muted/30 p-6 rounded-lg"><p className="text-3xl font-bold text-primary mb-2">+31%</p><p className="font-medium">Mejora en consistencia</p></div>
            <div className="bg-muted/30 p-6 rounded-lg"><p className="text-3xl font-bold text-primary mb-2">+42%</p><p className="font-medium">Aumento de motivación</p></div>
          </div>
          <Button asChild><Link to="/casos-de-exito">Ver Más Historias de Éxito</Link></Button>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative rounded-xl overflow-hidden shadow-xl border border-primary/20">
            <img  alt="Atleta celebrando una mejora significativa en su rendimiento" className="w-full h-auto" src="https://images.unsplash.com/photo-1558967719-991a2b766e1b" />
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent blur-3xl"></div>
        </div>
      </div>
    </div>
  </section>
);

const PricingCardAtletas = ({ title, description, price, features, popular, planKey, buttonText, buttonVariant = "default" }) => (
  <Card className={`border ${popular ? 'border-primary shadow-lg' : 'border-border'} relative`}>
    {popular && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">Más Popular</div>}
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        <span className="text-4xl font-bold">{price.amount}</span>
        {price.period && <span className="text-muted-foreground ml-2">{price.period}</span>}
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {features.map(feature => (
          <li key={feature} className="flex items-center">
            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button asChild className="w-full mt-6" variant={buttonVariant}>
        <Link to={`/registro?plan=${planKey}`}>{buttonText}</Link>
      </Button>
    </CardContent>
  </Card>
);

const PricingSectionAtletas = () => {
  const plans = [
    { title: "Básico", description: "Para atletas que están comenzando", price: { amount: "Gratis" }, features: ["Planes básicos de entrenamiento", "Seguimiento de progreso", "Recordatorios de entrenamiento", "Comunidad de atletas"], popular: false, planKey: "atleta_basico", buttonText: "Registrarse Gratis" },
    { title: "Pro", description: "Para atletas comprometidos", price: { amount: "9,99€", period: "/ mes" }, features: ["Planes personalizados con IA", "Análisis avanzado de rendimiento", "Comunicación con entrenador", "Recomendaciones nutricionales", "Exportación de datos"], popular: true, planKey: "atleta_pro", buttonText: "Comenzar Prueba Gratuita" },
    { title: "Elite", description: "Para atletas profesionales", price: { amount: "29,99€", period: "/ mes" }, features: ["Todo lo de Pro", "Análisis biomecánico", "Predicciones de rendimiento", "Integración con wearables", "Entrenador personal asignado"], popular: false, planKey: "atleta_elite", buttonText: "Comenzar Prueba Gratuita", buttonVariant: "outline" },
  ];
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes para Atletas</h2>
          <p className="text-xl text-muted-foreground">
            Elige el plan que mejor se adapte a tus necesidades y objetivos deportivos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(plan => <PricingCardAtletas key={plan.title} {...plan} />)}
        </div>
      </div>
    </section>
  );
};

const CTASectionAtletas = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 gradient-bg"></div>
    <div className="container relative z-10">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Comienza Tu Viaje Hacia la Excelencia
        </h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Únete a miles de atletas que ya están alcanzando su máximo potencial con ProSportAi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/registro?rol=atleta">
              Registrarse Gratis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
            <Link to="/solicitar-demo?para=atletas">Ver Demostración</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const AtletasPage = () => {
  return (
    <div>
      <HeroSectionAtletas />
      <FeaturesSectionAtletas />
      <TestimonialsSectionAtletas />
      <ResultsSectionAtletas />
      <PricingSectionAtletas />
      <CTASectionAtletas />
    </div>
  );
};

export default AtletasPage;
