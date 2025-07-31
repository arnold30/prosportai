
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

const testimonials = {
  entrenadores: [
    {
      quote: "ProSportAi ha revolucionado la forma en que diseño los planes de entrenamiento. La IA me proporciona insights que antes me llevaban semanas descubrir. ¡Mis atletas están alcanzando picos de rendimiento más rápido!",
      author: "Carlos Rodríguez",
      role: "Entrenador de Atletismo de Élite",
      avatar: "CR",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29hY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60"
    },
    {
      quote: "La gestión de múltiples atletas y la adaptación dinámica de los planes es increíble. Puedo dedicar más tiempo a la estrategia y menos a la administración. Es un cambio de juego.",
      author: "Sofía Herrera",
      role: "Entrenadora Principal, Club de Natación",
      avatar: "SH",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29hY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60"
    },
    {
      quote: "La capacidad de predecir el riesgo de lesiones y ajustar las cargas de entrenamiento ha sido fundamental para mantener a mi equipo en óptimas condiciones durante toda la temporada.",
      author: "Javier 'El Míster' Martínez",
      role: "Entrenador de Fútbol Profesional",
      avatar: "JM",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60"
    }
  ],
  clubes: [
    {
      quote: "Desde que implementamos ProSportAi, la comunicación y coordinación entre nuestros diferentes cuerpos técnicos ha mejorado un 200%. Los datos unificados son clave.",
      author: "Club Deportivo Victoria",
      role: "Director Deportivo",
      avatar: "CDV",
      image: "https://images.unsplash.com/photo-1543286386-71314c489265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BvcnRzJTIwY2x1YnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60"
    },
    {
      quote: "La plataforma nos ofrece una visión 360º del desarrollo de talento en todas nuestras categorías. Identificar futuras estrellas es ahora más fácil y preciso.",
      author: "Academia de Campeones FC",
      role: "Coordinador de Cantera",
      avatar: "ACFC",
      image: "https://images.unsplash.com/photo-1599226458890-80a3556706fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwb3J0cyUyMGNsdWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60"
    },
    {
      quote: "El soporte multilingüe y la adaptabilidad de ProSportAi han sido cruciales para nuestro club con presencia internacional. Una herramienta verdaderamente global.",
      author: "United Sports Group",
      role: "Director Técnico Global",
      avatar: "USG",
      image: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0cyUyMGNsdWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60"
    }
  ],
  atletas: [
    {
      quote: "Mi entrenamiento es ahora 100% personalizado. Siento que cada sesión está diseñada para mí y los resultados son evidentes. ¡He batido mis marcas personales!",
      author: "Laura Sánchez",
      role: "Atleta Olímpica de Élite",
      avatar: "LS",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXRobGV0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60"
    },
    {
      quote: "Las recomendaciones de la IA me han ayudado a entender mejor mi cuerpo y cómo optimizar mi recuperación. Me siento más fuerte y con menos fatiga.",
      author: "Miguel 'Titan' Torres",
      role: "Triatleta Profesional Ironman",
      avatar: "MT",
      image: "https://images.unsplash.com/photo-1579362463650-7cc519ee8cf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXRobGV0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60"
    },
    {
      quote: "La app es súper intuitiva y me mantiene motivado. Ver mi progreso en gráficos y recibir feedback constante de mi entrenador a través de la plataforma es genial.",
      author: "Ana 'Veloz' Gómez",
      role: "Maratonista Internacional",
      avatar: "AG",
      image: "https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF0aGxldGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60"
    }
  ]
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Historias de Éxito con ProSportAi</h2>
          <p className="text-xl text-muted-foreground">
            Descubre cómo ProSportAi está empoderando a la comunidad deportiva global para alcanzar la excelencia.
          </p>
        </div>
        
        <Tabs defaultValue="entrenadores" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-lg grid-cols-3 bg-background/70 backdrop-blur-sm p-1 rounded-lg shadow-sm">
              <TabsTrigger value="entrenadores" className="text-base py-2.5">Entrenadores</TabsTrigger>
              <TabsTrigger value="clubes" className="text-base py-2.5">Clubes</TabsTrigger>
              <TabsTrigger value="atletas" className="text-base py-2.5">Atletas</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="entrenadores">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.entrenadores.map((testimonial, index) => (
                <TestimonialCard key={`entrenador-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="clubes">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.clubes.map((testimonial, index) => (
                <TestimonialCard key={`club-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="atletas">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.atletas.map((testimonial, index) => (
                <TestimonialCard key={`atleta-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div variants={item} className="h-full">
      <Card className="h-full flex flex-col bg-background border-primary/10 shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="pb-4">
           <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <CardTitle className="text-lg leading-relaxed text-foreground/90">"{testimonial.quote}"</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 mt-auto">
          <div className="flex items-center mt-4">
            <Avatar className="h-12 w-12 mr-4 border-2 border-primary/50">
              <AvatarImage src={testimonial.image} alt={testimonial.author} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">{testimonial.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-base text-primary">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Testimonials;
