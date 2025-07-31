import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'; // useNavigate importado
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, ShieldCheck, CalendarOff, HelpCircle, Edit3 } from 'lucide-react';

const GestionSuscripcionPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Hook useNavigate

  if (!currentUser) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  const currentPlan = currentUser.plan || 'Pro'; // Asumir Pro si no hay plan específico
  const renewalDate = "15 de Junio, 2025"; // Dato de ejemplo

  const handleVerPlanes = () => {
    navigate('/#precios'); // Navega a la HomePage y la sección de precios
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-3xl mx-auto"
      >
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/panel-usuario">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Panel
          </Link>
        </Button>

        <Card className="shadow-xl border-primary/20">
          <CardHeader className="bg-muted/30 p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold text-gradient">Gestionar Suscripción</CardTitle>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <CardDescription className="text-lg mt-1">
              Aquí puedes ver los detalles de tu plan actual y realizar cambios.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="text-xl font-semibold mb-2 text-primary">Tu Plan Actual: {currentPlan}</h3>
              <p className="text-muted-foreground">
                {currentPlan === 'Gratis' 
                  ? 'Estás en el plan gratuito. ¡Actualiza para desbloquear más funciones!' 
                  : `Tu suscripción se renueva el ${renewalDate}.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Edit3 className="mr-2 h-5 w-5 text-primary" />
                    Cambiar Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Explora otros planes y encuentra el que mejor se adapte a tus necesidades.</p>
                  <Button className="w-full" onClick={handleVerPlanes}>
                    Ver Planes y Precios
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
                    Detalles de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Actualiza tu método de pago o revisa tu historial de facturación.</p>
                  <Button className="w-full" variant="outline" onClick={() => alert('Redirigiendo a la configuración de pago...')}>
                    Administrar Pago
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center pt-6 border-t border-border">
              <h4 className="text-lg font-medium mb-3">¿Necesitas cancelar tu suscripción?</h4>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Si cancelas, perderás acceso a las funciones Pro al final de tu periodo de facturación actual.
              </p>
              <Button variant="destructive" onClick={() => alert('Iniciando proceso de cancelación...')}>
                <CalendarOff className="mr-2 h-4 w-4" />
                Cancelar Suscripción
              </Button>
            </div>

            <div className="mt-8 text-center">
              <Link to="/soporte" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                ¿Preguntas? Contacta a Soporte
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GestionSuscripcionPage;