import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Logo = () => (
  <div className="flex items-center">
    <Zap className="h-8 w-8 text-primary" />
    <span className="ml-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      ProSportAi
    </span>
  </div>
);

const Footer = () => {
  const { t } = useTranslation();
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar email (e.g., usando una API de email marketing)
    alert("¡Gracias por suscribirte a nuestro boletín!");
    e.target.reset();
  };

  const footerSections = [
    {
      title: t('footer.solutions_title'),
      links: [
        { text: t('footer.for_coaches'), to: "/entrenadores" },
        { text: t('footer.for_clubs'), to: "/clubes" },
        { text: t('footer.for_athletes'), to: "/atletas" },
        { text: t('footer.for_federations'), to: "/federaciones" }, 
        { text: t('footer.plans_pricing'), to: "/#precios" }, 
        { text: t('footer.request_demo'), to: "/solicitar-demo" },
      ],
    },
    {
      title: t('footer.resources_title'),
      links: [
        { text: t('footer.ai_sports_blog'), to: "/blog" }, // Actualizado para apuntar a /blog
        { text: t('footer.success_stories'), to: "/casos-de-exito" }, 
        { text: t('footer.api_documentation'), to: "/documentacion" }, 
        { text: t('footer.video_tutorials'), to: "/tutorial" }, // Actualizado para apuntar a /tutorial
        { text: t('footer.community'), to: "/comunidad" }, 
        { text: t('footer.faq'), to: "/faq" }, 
      ],
    },
    {
      title: t('footer.company_title'),
      links: [
        { text: t('footer.about_us'), to: "/sobre-nosotros" }, 
        { text: t('footer.contact_support'), to: "/contacto" }, 
        { text: t('footer.careers'), to: "/carreras" }, 
        { text: t('footer.press_room'), to: "/prensa" }, 
        { text: t('footer.partner_program'), to: "/partners" }, 
        { text: t('footer.security_trust'), to: "/seguridad" }, 
      ],
    },
  ];

  const legalLinks = [
    { text: t('footer.terms_of_service'), to: "/terminos-servicio" },
    { text: t('footer.privacy_policy'), to: "/politica-privacidad" },
    { text: t('footer.cookie_policy'), to: "/politica-cookies" },
    { text: t('footer.sitemap'), to: "/mapa-sitio" },
  ];


  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground mb-6 text-base">
              {t('footer.tagline')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
              <Input type="email" placeholder={t('footer.newsletter_placeholder')} required className="flex-grow" />
              <Button type="submit" variant="default">{t('footer.newsletter_button')}</Button>
            </form>
             <p className="text-xs text-muted-foreground mt-2">{t('footer.newsletter_info')}</p>
          </div>
          
          {footerSections.map(section => (
            <div key={section.title}>
              <p className="font-semibold text-lg mb-4">{section.title}</p>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.text}><Link to={link.to} className="footer-link">{link.text}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} ProSportAi Technologies. {t('footer.all_rights_reserved')}.
          </p>
          <div className="flex items-center space-x-4">
            <a href="mailto:info@prosportai.com" className="social-icon"><Mail size={22} /><span className="sr-only">Email</span></a>
            <a href="https://facebook.com/prosportai" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={22} /><span className="sr-only">Facebook</span></a>
            <a href="https://twitter.com/prosportai" target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter size={22} /><span className="sr-only">Twitter</span></a>
            <a href="https://instagram.com/prosportai" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={22} /><span className="sr-only">Instagram</span></a>
            <a href="https://linkedin.com/company/prosportai" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={22} /><span className="sr-only">LinkedIn</span></a>
            <a href="https://youtube.com/prosportai" target="_blank" rel="noopener noreferrer" className="social-icon"><Youtube size={22} /><span className="sr-only">YouTube</span></a>
          </div>
        </div>
         <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center md:justify-start">
            {legalLinks.map(link => (
              <Link key={link.to} to={link.to} className="hover:text-primary transition-colors">{link.text}</Link>
            ))}
          </div>
      </div>
    </footer>
  );
};

export default Footer;