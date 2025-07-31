
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

const StatsWidget = ({ user }) => (
  <Card className="shadow-lg hover-lift">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">Estadísticas Clave</CardTitle>
      <BarChart2 className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      {user.rol === 'atleta' && (
        <div className="space-y-2">
          <p className="text-sm">Horas entrenadas (semana): <span className="font-semibold text-primary">{user.stats?.hoursTrainedWeekly || 'N/A'}</span></p>
          <p className="text-sm">Récord personal (carrera 5k): <span className="font-semibold text-primary">{user.stats?.personalBest5k || 'N/A'}</span></p>
          <p className="text-sm">Consistencia: <span className="font-semibold text-green-500">{user.stats?.consistency || 'N/A'}</span></p>
        </div>
      )}
      {user.rol === 'entrenador' && (
         <div className="space-y-2">
          <p className="text-sm">Atletas activos: <span className="font-semibold text-primary">{user.stats?.activeAthletes || 'N/A'}</span></p>
          <p className="text-sm">Cumplimiento promedio: <span className="font-semibold text-green-500">{user.stats?.avgCompliance || 'N/A'}</span></p>
          <p className="text-sm">Sesiones planificadas (semana): <span className="font-semibold text-primary">{user.stats?.sessionsPlannedWeekly || 'N/A'}</span></p>
        </div>
      )}
       {user.rol === 'club' && (
         <div className="space-y-2">
          <p className="text-sm">Equipos activos: <span className="font-semibold text-primary">{user.stats?.activeTeams || 'N/A'}</span></p>
          <p className="text-sm">Atletas totales: <span className="font-semibold text-primary">{user.stats?.totalAthletes || 'N/A'}</span></p>
          <p className="text-sm">Rendimiento general: <span className="font-semibold text-green-500">{user.stats?.overallPerformance || 'N/A'}</span></p>
        </div>
      )}
      <Button variant="outline" size="sm" className="mt-4">Ver Todas las Estadísticas</Button>
    </CardContent>
  </Card>
);

export default StatsWidget;
