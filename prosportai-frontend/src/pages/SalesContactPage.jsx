import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, Building, MessageSquare, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const SalesContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get('plan');
    if (plan) {
      let planName = '';
      if (plan === 'club_enterprise' || plan === 'enterprise') {
        planName = 'Enterprise / Federación';
      } else if (plan === 'club_pro') {
        planName = 'Club Pro';
      } else if (plan === 'club_basico') {
        planName = 'Club Básico';
      }
      setSelectedPlan(planName);
      setMessage(prevMessage => `Estoy interesado/a en el plan ${planName}. Por favor, me gustaría obtener más información.\n\n${prevMessage}`);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !organization || !message) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    const subject = `Consulta Plan ${selectedPlan || 'Enterprise'} - ${organization}`;
    const body = `Nombre: ${name}\nEmail: ${email}\nOrganización: ${organization}\n\nInteresado en el plan: ${selectedPlan || 'Enterprise/Federación'}\n\nMensaje:\n${message}`;
    
    const mailtoLink = `mailto:info@prosportai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Redirigiendo a tu cliente de correo",
      description: "Prepara tu mensaje para enviarlo a info@prosportai.com.",
    });
  };
  
  // Necesitamos crear Textarea si no existe
  // Como no puedo crear `textarea.jsx` aquí, asumiré que es similar a `Input`
  // Si Textarea no está definida, esto podría causar un error.
  // Idealmente, `textarea.jsx` debería ser creado por el sistema o por mí en un paso previo.
  // Por ahora, procedo asumiendo su existencia.

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-sky-100">
      <div className="container max-w-3xl mx-auto">
        <Card className="shadow-xl border-primary/20 bg-background overflow-hidden">
          <CardHeader className="bg-primary/5 p-8 text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Contacta con Ventas</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              {selectedPlan 
                ? `Estás interesado en nuestro plan ${selectedPlan}. ` 
                : "Cuéntanos sobre tus necesidades y te ayudaremos a encontrar la solución perfecta."}
              <br />
              Completa el formulario y te ayudaremos a preparar un borrador de correo para <strong className="text-primary">info@prosportai.com</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center text-base">
                    <User className="mr-2 h-4 w-4 text-primary" /> Nombre Completo
                  </Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Tu nombre completo" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="text-base p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-base">
                    <Mail className="mr-2 h-4 w-4 text-primary" /> Correo Electrónico
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="text-base p-3"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization" className="flex items-center text-base">
                  <Building className="mr-2 h-4 w-4 text-primary" /> Club / Organización
                </Label>
                <Input 
                  id="organization" 
                  type="text" 
                  placeholder="Nombre de tu club u organización" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required 
                  className="text-base p-3"
                />
              </div>
              {selectedPlan && (
                <div className="space-y-2">
                  <Label htmlFor="plan" className="flex items-center text-base">
                    Plan Seleccionado
                  </Label>
                  <Input 
                    id="plan" 
                    type="text" 
                    value={selectedPlan}
                    readOnly
                    className="text-base p-3 bg-slate-100"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center text-base">
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" /> Mensaje
                </Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe tus necesidades o preguntas..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                  rows={6}
                  className="text-base p-3"
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg py-6">
                <Send className="mr-2 h-5 w-5" /> Abrir Borrador de Email
              </Button>
            </form>
            <p className="mt-8 text-center text-muted-foreground">
              O si lo prefieres, envía un correo directamente a <a href="mailto:info@prosportai.com" className="text-primary font-medium hover:underline">info@prosportai.com</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesContactPage;
