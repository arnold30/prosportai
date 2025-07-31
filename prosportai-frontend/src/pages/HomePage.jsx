import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import AIFeature from '@/components/AIFeature';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#precios') {
      const pricingSection = document.getElementById('precios');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <motion.section 
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <Hero />
      </motion.section>

      <motion.section 
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-background to-muted/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Features />
      </motion.section>

      <motion.section 
        className="w-full py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <AIFeature />
      </motion.section>

      <motion.section 
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-muted/50 to-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.section>

      <motion.section 
        id="precios" // ID añadido para el anclaje
        className="w-full py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Pricing />
      </motion.section>

      <motion.section 
        className="w-full py-16 lg:py-24 bg-gradient-to-b from-background to-primary/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <CTA />
      </motion.section>
    </div>
  );
};

export default HomePage;