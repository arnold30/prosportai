
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Smartphone, ShieldCheck } from 'lucide-react';
import TwoFactorAuthDialog from '@/components/TwoFactorAuthDialog';
import { useToast } from "@/components/ui/use-toast";

const SecuritySettings = ({ user, onUpdateUser }) => {
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const { toast } = useToast();

  const handle2FAActivation = (success) => {
    if (success) {
      onUpdateUser({ ...user, is2FAEnabled: true });
    }
  };
  
  const handleDisable2FA = () => {
    onUpdateUser({ ...user, is2FAEnabled: false });
    toast({
      title: "2FA Desactivada",
      description: "La autenticación de dos factores ha sido desactivada.",
    });
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Seguridad</CardTitle>
          <CardDescription>Gestiona tu contraseña y opciones de seguridad.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Cambiar Contraseña</Button>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <div className="flex items-center">
              <Smartphone className="mr-2 h-5 w-5 text-muted-foreground" />
              <p>Autenticación de dos factores (2FA)</p>
            </div>
            {user.is2FAEnabled ? (
              <Button variant="destructive" size="sm" onClick={handleDisable2FA}>Desactivar</Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => setIs2FADialogOpen(true)}>Activar</Button>
            )}
          </div>
          {user.is2FAEnabled && (
            <div className="flex items-center text-sm text-green-600 p-2 bg-green-500/10 rounded-md">
              <ShieldCheck className="mr-2 h-4 w-4" />
              2FA está activada para tu cuenta.
            </div>
          )}
        </CardContent>
      </Card>
      <TwoFactorAuthDialog
        open={is2FADialogOpen}
        onOpenChange={setIs2FADialogOpen}
        onVerify={handle2FAActivation}
      />
    </>
  );
};

export default SecuritySettings;
