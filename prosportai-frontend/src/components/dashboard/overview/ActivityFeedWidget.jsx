
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Zap } from 'lucide-react';

const ActivityFeedWidget = () => (
  <Card className="shadow-lg hover-lift">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">Próximas Actividades</CardTitle>
      <CalendarDays className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        <li className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
          <div>
            <p className="font-medium text-sm">Revisión de progreso con Entrenador</p>
            <p className="text-xs text-muted-foreground">Mañana, 10:00 AM</p>
          </div>
          <Zap className="h-4 w-4 text-yellow-500" />
        </li>
        <li className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
          <div>
            <p className="font-medium text-sm">Competición de Liga</p>
            <p className="text-xs text-muted-foreground">Sábado, 03 Junio, 16:00 PM</p>
          </div>
          <Zap className="h-4 w-4 text-red-500" />
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default ActivityFeedWidget;
