
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, BarChart, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="container relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Award className="mx-auto h-16 w-16 mb-4 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para Desbloquear el Máximo Rendimiento?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Únete a la élite de entrenadores, clubes y atletas que confían en ProSportAi para transformar su preparación y alcanzar la victoria.
            Nuestra IA está lista para ser tu aliada estratégica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link to="/registro">
                Comienza tu Prueba Gratuita <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link to="/solicitar-demo">
                Solicita una Demo Personalizada
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
              <Users className="mx-auto h-8 w-8 mb-2 text-yellow-300" />
              <p className="text-3xl font-bold">3,000+</p>
              <p className="text-white/80">Entrenadores Activos</p>
            </motion.div>
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
              <Award className="mx-auto h-8 w-8 mb-2 text-yellow-300" />
              <p className="text-3xl font-bold">500+</p>
              <p className="text-white/80">Clubes Potenciados</p>
            </motion.div>
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
              <BarChart className="mx-auto h-8 w-8 mb-2 text-yellow-300" />
              <p className="text-3xl font-bold">50,000+</p>
              <p className="text-white/80">Atletas en Progreso</p>
            </motion.div>
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:0.5 }}>
              <Globe className="mx-auto h-8 w-8 mb-2 text-yellow-300" />
              <p className="text-3xl font-bold">30+</p>
              <p className="text-white/80">Países Conectados</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
    </section>
  );
};

export default CTA;