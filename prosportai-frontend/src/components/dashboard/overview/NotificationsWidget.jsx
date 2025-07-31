
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const NotificationsWidget = () => (
  <Card className="shadow-lg hover-lift">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">Notificaciones</CardTitle>
      <Bell className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        <li className="p-2 border-l-4 border-primary bg-primary/10 rounded-r-md">
          <p className="font-medium text-sm">¡Nuevo récord personal en sentadilla!</p>
          <p className="text-xs text-muted-foreground">Hace 2 horas</p>
        </li>
        <li className="p-2 border-l-4 border-yellow-500 bg-yellow-500/10 rounded-r-md">
          <p className="font-medium text-sm">Recordatorio: Hidratación post-entreno.</p>
          <p className="text-xs text-muted-foreground">Hace 1 día</p>
        </li>
      </ul>
      <Button variant="link" size="sm" className="mt-3 p-0">Ver todas</Button>
    </CardContent>
  </Card>
);

export default NotificationsWidget;
