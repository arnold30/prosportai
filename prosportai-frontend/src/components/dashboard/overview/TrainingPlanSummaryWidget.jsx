
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';

const TrainingPlanSummaryWidget = ({ user, onNavigateToTrainingTab }) => (
  <Card className="col-span-1 md:col-span-2 shadow-lg hover-lift">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">Tu Plan de Entrenamiento</CardTitle>
      <Dumbbell className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-3">
        {user.rol === 'atleta' ? "Resumen de tu actividad programada." : 
         user.rol === 'entrenador' ? "Gestiona los planes de tus atletas." :
         "Supervisa los planes de todos los equipos."
        }
      </p>
      {user.rol === 'atleta' && (
        <div className="space-y-1 mb-3">
          <p className="text-xs"><span className="font-semibold">Próxima sesión:</span> Fuerza - Tren Superior (Mañana)</p>
        </div>
      )}
      <Button variant="outline" size="sm" onClick={onNavigateToTrainingTab}>
        Ver Planes de Entrenamiento
      </Button>
    </CardContent>
  </Card>
);

export default TrainingPlanSummaryWidget;
