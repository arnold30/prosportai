
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const IntegrationsSettings = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle>Integraciones</CardTitle>
       <CardDescription>Conecta ProSportAi con tus otras aplicaciones.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Garmin, Strava, Apple Health, etc.</p>
       <p className="text-xs text-muted-foreground mt-2">Esta sección se implementará próximamente.</p>
    </CardContent>
  </Card>
);

export default IntegrationsSettings;
