
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const RecentMessagesWidget = () => (
  <Card className="shadow-lg hover-lift">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">Mensajes Recientes</CardTitle>
      <MessageSquare className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">No tienes mensajes nuevos.</p>
      <Button variant="link" size="sm" className="p-0 mt-2">Ir a la bandeja de entrada</Button>
    </CardContent>
  </Card>
);

export default RecentMessagesWidget;
