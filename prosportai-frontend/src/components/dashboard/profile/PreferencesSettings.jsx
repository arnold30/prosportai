
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const PreferencesSettings = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle>Preferencias</CardTitle>
      <CardDescription>Personaliza tu experiencia en la plataforma.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Opciones de notificación, unidades de medida, etc.</p>
      <p className="text-xs text-muted-foreground mt-2">Esta sección se implementará próximamente.</p>
    </CardContent>
  </Card>
);

export default PreferencesSettings;
