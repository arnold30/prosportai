
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";

const UserProfileSettings = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.nombre);
  const [email, setEmail] = useState(user.email);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdateUser({ ...user, nombre: name, email });
    toast({ title: "Perfil Actualizado", description: "Tus cambios han sido guardados."});
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Configuración del Perfil</CardTitle>
        <CardDescription>Administra tu información personal y preferencias.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="profile-name" className="block text-sm font-medium text-muted-foreground">Nombre</Label>
          <Input id="profile-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="profile-email" className="block text-sm font-medium text-muted-foreground">Email</Label>
          <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
        </div>
        <Button onClick={handleSave}>Guardar Cambios</Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileSettings;
