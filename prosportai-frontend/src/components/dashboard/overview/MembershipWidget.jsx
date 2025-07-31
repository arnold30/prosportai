import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { CreditCard, UserCheck } from 'lucide-react';

const MembershipWidget = ({ user }) => {
  if (user.rol === 'atleta') {
    return (
      <Card className="shadow-lg hover-lift">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Acceso de Atleta</CardTitle>
          <UserCheck className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-500">Acceso Gratuito</p>
          <p className="text-xs text-muted-foreground mb-3">
            Disfruta de todas las funciones para atletas sin coste alguno.
          </p>
          <p className="text-sm">
            Tu entrenador gestiona tu acceso. ¡Concéntrate en tu rendimiento!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg hover-lift">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Membresía</CardTitle>
        <CreditCard className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">Plan {user.plan || 'Pro'}</p>
        <p className="text-xs text-muted-foreground mb-3">
          {user.plan === 'Gratis' ? 'Actualiza para más funciones.' : `Próxima renovación: ${user.renewalDate || '15 de Junio, 2025'}`}
        </p>
        <Button asChild variant="default" size="sm">
          <Link to="/gestion-suscripcion">Administrar Suscripción</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MembershipWidget;